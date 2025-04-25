import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { affiliatePrograms } from '../drizzle/schema.js';
import { authenticateUser } from "./shared/auth.js";
import Sentry from "./shared/sentry.js";
import { z } from 'zod';
import { createValidator } from "./shared/validators.js";

// Schema for app status update
const updateAppStatusSchema = z.object({
  appId: z.string(), // Keep as string to maintain precision
  status: z.enum(['approved', 'rejected']),
});

// Create validator
const validateUpdateAppStatus = createValidator(updateAppStatusSchema, 'UpdateAppStatus');

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
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    // Log the numeric conversion for debugging
    const numericId = Number(stringAppId);
    console.log('Numeric conversion:', {
      stringAppId,
      numericId,
      isSafeInteger: Number.isSafeInteger(numericId)
    });
    
    // Instead of parseInt, use the raw string in a raw SQL query to avoid precision issues
    // First check if the app exists
    const queryText = `SELECT * FROM "affiliate_programs" WHERE "id" = $1 LIMIT 1`;
    const queryResult = await client.query(queryText, [stringAppId]);
    const existingApp = queryResult.length > 0 ? queryResult[0] : null;
    
    console.log('Existing app check result:', existingApp);
    
    if (!existingApp) {
      await client.end();
      console.error(`No app found with ID: ${stringAppId}`);
      return res.status(404).json({ error: `App not found with ID: ${stringAppId}` });
    }
    
    // Now update the app using raw SQL to maintain ID precision
    const updateText = `
      UPDATE "affiliate_programs" 
      SET "status" = $1, "updated_at" = $2 
      WHERE "id" = $3 
      RETURNING *
    `;
    const updateResult = await client.query(
      updateText, 
      [validatedData.status, new Date(), stringAppId]
    );
    
    await client.end();
    
    console.log(`Update result:`, updateResult);
    
    if (updateResult.length === 0) {
      console.error(`Update operation didn't return any results for app ID: ${stringAppId}`);
      throw new Error(`Update failed for app ID: ${stringAppId}`);
    }
    
    const updatedApp = updateResult[0];
    console.log(`App ${stringAppId} reviewed with status: ${status}`);
    
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