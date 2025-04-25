import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { affiliatePrograms } from '../drizzle/schema.js';
import { authenticateUser } from "./shared/auth.js";
import Sentry from "./shared/sentry.js";
import { z } from 'zod';
import { createValidator } from "./shared/validators.js";
import { Resend } from 'resend';

// Define schemas for affiliate apps
export const createAppSchema = z.object({
  userId: z.string(),
  userEmail: z.string().email().optional(),
  appName: z.string().min(1, 'App name is required'),
  appDescription: z.string().min(1, 'App description is required'),
  appUrl: z.string().url('Valid URL is required'),
  commissionStructure: z.string().min(1, 'Commission structure is required'),
  paymentTerms: z.string().min(1, 'Payment terms are required'),
  affiliateSignupUrl: z.string().url('Valid affiliate signup URL is required'),
  promotionalMaterials: z.string().optional().nullable(),
  status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
});

// Create validator
export const validateCreateApp = createValidator(createAppSchema, 'CreateAffiliateApp');

/**
 * Send email notification about a new app submission
 */
const sendNewAppEmail = async (app) => {
  try {
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'ZAPT Affiliate Marketplace <noreply@zapt.ai>',
        to: 'david@zapt.ai',
        subject: 'New Affiliate App Submission',
        html: `
          <h1>New Affiliate App Submission</h1>
          <p>A new affiliate app has been submitted:</p>
          <ul>
            <li><strong>App Name:</strong> ${app.appName}</li>
            <li><strong>App Description:</strong> ${app.appDescription}</li>
            <li><strong>App URL:</strong> ${app.appUrl}</li>
            <li><strong>Commission Structure:</strong> ${app.commissionStructure}</li>
            <li><strong>Payment Terms:</strong> ${app.paymentTerms}</li>
            <li><strong>Affiliate Signup URL:</strong> ${app.affiliateSignupUrl}</li>
          </ul>
          <p>Please review this submission in the admin portal.</p>
        `,
      });
      console.log('Email notification sent');
    } else {
      console.log('Skipping email notification: RESEND_API_KEY not configured');
    }
  } catch (error) {
    console.error('Error sending email notification:', error);
    Sentry.captureException(error);
    // Don't throw the error, just log it
  }
};

export default async function handler(req, res) {
  console.log('Submit app request received:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const user = await authenticateUser(req);
    console.log('User authenticated:', user.id);
    
    // Create a copy of the request body and explicitly remove the id field
    const appData = { ...req.body };
    delete appData.id; // Remove id field if present - it's auto-generated
    console.log('App data received (cleaned):', appData);
    
    if (!user.id) {
      console.error('Missing user ID after authentication');
      return res.status(400).json({ error: 'User ID is required but not available' });
    }
    
    // First, prepare the data with user ID and email
    const dataWithUser = {
      ...appData,
      userId: user.id,
      userEmail: user.email, // Store the user's email for notifications
      status: 'pending'
    };

    // Then validate the complete data with userId included
    const validatedData = validateCreateApp(dataWithUser);
    
    // Insert into database
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    const result = await db.insert(affiliatePrograms).values({
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
    
    await client.end();
    
    const createdApp = result[0];
    console.log('App submitted successfully:', createdApp);
    
    // No event bus call here - we handle email notification directly in this function
    await sendNewAppEmail(createdApp);
    
    return res.status(201).json({
      message: 'App submitted successfully',
      app: createdApp
    });
    
  } catch (error) {
    console.error('Error submitting app:', error);
    Sentry.captureException(error);
    
    if (error.message.includes('Validation failed')) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(500).json({ error: 'Failed to submit app' });
  }
}