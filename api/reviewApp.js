import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { affiliatePrograms } from '../drizzle/schema.js';
import { authenticateUser } from "./shared/auth.js";
import Sentry from "./shared/sentry.js";
import { z } from 'zod';
import { createValidator } from "./shared/validators.js";
import { Resend } from 'resend';

// Schema for app status update
const updateAppStatusSchema = z.object({
  appId: z.string(), // Keep as string to maintain precision
  status: z.enum(['approved', 'rejected']),
});

// Create validator
const validateUpdateAppStatus = createValidator(updateAppStatusSchema, 'UpdateAppStatus');

/**
 * Creates an email template based on app status
 */
const getEmailTemplate = (app, status) => {
  const isApproved = status === 'approved';
  
  return isApproved 
    ? `
        <h1>Congratulations! Your App Has Been Approved</h1>
        <p>We're pleased to inform you that your application "${app.app_name}" has been approved and is now live on the ZAPT Affiliate Marketplace.</p>
        <p>Your app is now visible to potential affiliates who can help promote it.</p>
        <h2>What's Next?</h2>
        <ul>
          <li>Your app is now discoverable by all ZAPT Affiliate Marketplace users</li>
          <li>You'll be notified when affiliates sign up to promote your app</li>
          <li>You can manage your app settings in your dashboard</li>
        </ul>
        <p>Thank you for being part of the ZAPT ecosystem!</p>
      `
    : `
        <h1>Your App Submission Status</h1>
        <p>Thank you for submitting your app "${app.app_name}" to the ZAPT Affiliate Marketplace.</p>
        <p>After careful review, we regret to inform you that your app has not been approved at this time.</p>
        <p>Common reasons for this decision include:</p>
        <ul>
          <li>Incomplete app information</li>
          <li>Commission structure needs clarification</li>
          <li>Misalignment with our marketplace guidelines</li>
        </ul>
        <p>You're welcome to make improvements and submit again. If you have questions, please reach out to our support team.</p>
      `;
};

/**
 * Send email notification to app creator about review decision
 */
const sendAppReviewEmail = async (app, status) => {
  try {
    if (!app.user_email) {
      console.log(`Skipping app review email: No user email available for app ID ${app.id}`);
      return;
    }
    
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      const isApproved = status === 'approved';
      
      await resend.emails.send({
        from: 'ZAPT Affiliate Marketplace <noreply@zapt.ai>',
        to: app.user_email,
        subject: isApproved ? 'Your App Has Been Approved!' : 'Your App Submission Status',
        html: getEmailTemplate(app, status)
      });
      console.log(`App review email sent to creator (${app.user_email}) for app ID ${app.id}`);
    } else {
      console.log('Skipping app review email: RESEND_API_KEY not configured');
    }
  } catch (error) {
    console.error('Error sending app review email:', error);
    Sentry.captureException(error);
    // Don't throw the error, just log it
  }
};

export default async function handler(req, res) {
  console.log('Review app request received');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const user = await authenticateUser(req);
    console.log('User authenticated:', user.id);
    
    // Get appId and status from request body
    const { appId, status } = req.body;
    console.log('Request params:', { appId, status, appIdType: typeof appId });
    
    // Basic validation
    if (!appId || !status) {
      return res.status(400).json({ error: 'Missing appId or status' });
    }
    
    if (status !== 'approved' && status !== 'rejected') {
      return res.status(400).json({ error: 'Status must be approved or rejected' });
    }
    
    // Always convert appId to string to maintain precision
    const stringAppId = String(appId);
    console.log('String appId:', stringAppId);
    
    // Validate the input data
    const validatedData = validateUpdateAppStatus({
      appId: stringAppId,
      status
    });
    
    // Check admin privileges
    if (!user.email?.endsWith('@zapt.ai') && !user.email?.endsWith('@mapt.events')) {
      throw new Error('Not authorized to review apps');
    }
    
    // Initialize database connection
    const sql = postgres(process.env.COCKROACH_DB_URL);
    
    // Log the numeric conversion for debugging
    const numericId = Number(stringAppId);
    console.log('Numeric conversion:', {
      stringAppId,
      numericId,
      isSafeInteger: Number.isSafeInteger(numericId)
    });
    
    // Check if the app exists using tagged template literal syntax
    const existingApps = await sql`
      SELECT * FROM "affiliate_programs" 
      WHERE "id" = ${stringAppId} 
      LIMIT 1
    `;
    const existingApp = existingApps.length > 0 ? existingApps[0] : null;
    
    console.log('Existing app check result:', existingApp);
    
    if (!existingApp) {
      await sql.end();
      console.error(`No app found with ID: ${stringAppId}`);
      return res.status(404).json({ error: `App not found with ID: ${stringAppId}` });
    }
    
    // Now update the app using tagged template literal syntax
    const updateResult = await sql`
      UPDATE "affiliate_programs" 
      SET "status" = ${validatedData.status}, "updated_at" = ${new Date()} 
      WHERE "id" = ${stringAppId} 
      RETURNING *
    `;
    
    await sql.end();
    
    console.log(`Update result:`, updateResult);
    
    if (updateResult.length === 0) {
      console.error(`Update operation didn't return any results for app ID: ${stringAppId}`);
      throw new Error(`Update failed for app ID: ${stringAppId}`);
    }
    
    const updatedApp = updateResult[0];
    console.log(`App ${stringAppId} reviewed with status: ${status}`);
    
    // Send notification email to app creator
    await sendAppReviewEmail(updatedApp, validatedData.status);
    
    return res.status(200).json({ 
      message: `App ${status} successfully`,
      app: updatedApp
    });
    
  } catch (error) {
    console.error('Error reviewing app:', error);
    Sentry.captureException(error, {
      extra: {
        requestBody: req.body
      }
    });
    
    if (error.message === 'Not authorized to review apps') {
      return res.status(403).json({ error: error.message });
    }
    
    if (error.message.includes('App not found') || error.message.includes('Update failed')) {
      return res.status(404).json({ error: error.message });
    }
    
    if (error.message.includes('Validation failed')) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(500).json({ 
      error: 'Failed to review app',
      details: error.message
    });
  }
}