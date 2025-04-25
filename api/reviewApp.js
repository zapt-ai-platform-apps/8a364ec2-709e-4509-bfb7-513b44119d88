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
  appId: z.number(),
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
    
    const { appId, status } = req.body;
    console.log('Request params:', { appId, status, appIdType: typeof appId });
    
    if (!appId || !status) {
      return res.status(400).json({ error: 'Missing appId or status' });
    }
    
    if (status !== 'approved' && status !== 'rejected') {
      return res.status(400).json({ error: 'Status must be approved or rejected' });
    }
    
    // Ensure appId is a valid number
    let parsedAppId;
    try {
      parsedAppId = Number(appId);
      if (isNaN(parsedAppId)) {
        throw new Error('Invalid app ID format');
      }
      console.log('Parsed appId:', parsedAppId);
    } catch (e) {
      console.error('Error parsing appId:', e);
      return res.status(400).json({ error: 'Invalid appId format' });
    }
    
    // Validate the input data
    const validatedData = validateUpdateAppStatus({
      appId: parsedAppId,
      status
    });
    
    // Check admin privileges
    if (!user.email?.endsWith('@zapt.ai') && !user.email?.endsWith('@mapt.events')) {
      throw new Error('Not authorized to review apps');
    }
    
    // Update app status
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    console.log('Executing database query with appId:', parsedAppId);
    
    // First check if the app exists
    const existingApp = await db.select()
      .from(affiliatePrograms)
      .where(eq(affiliatePrograms.id, parsedAppId))
      .limit(1);
      
    console.log('Existing app check result:', existingApp);
    
    if (existingApp.length === 0) {
      await client.end();
      console.error(`No app found with ID: ${parsedAppId}`);
      return res.status(404).json({ error: `App not found with ID: ${parsedAppId}` });
    }
    
    // Now update the app
    const result = await db.update(affiliatePrograms)
      .set({ 
        status: validatedData.status,
        updatedAt: new Date()
      })
      .where(eq(affiliatePrograms.id, parsedAppId))
      .returning();
    
    await client.end();
    
    console.log(`Update result:`, result);
    
    if (result.length === 0) {
      console.error(`Update operation didn't return any results for app ID: ${parsedAppId}`);
      throw new Error(`Update failed for app ID: ${parsedAppId}`);
    }
    
    const updatedApp = result[0];
    console.log(`App ${parsedAppId} reviewed with status: ${status}`);
    
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