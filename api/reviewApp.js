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
    
    if (!appId || !status) {
      return res.status(400).json({ error: 'Missing appId or status' });
    }
    
    if (status !== 'approved' && status !== 'rejected') {
      return res.status(400).json({ error: 'Status must be approved or rejected' });
    }
    
    // Validate the input data
    const validatedData = validateUpdateAppStatus({
      appId: Number(appId),
      status
    });
    
    // Check admin privileges
    if (!user.email?.endsWith('@zapt.ai') && !user.email?.endsWith('@mapt.events')) {
      throw new Error('Not authorized to review apps');
    }
    
    // Update app status
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    const result = await db.update(affiliatePrograms)
      .set({ 
        status: validatedData.status,
        updatedAt: new Date()
      })
      .where(eq(affiliatePrograms.id, validatedData.appId))
      .returning();
    
    await client.end();
    
    if (result.length === 0) {
      throw new Error('App not found');
    }
    
    const updatedApp = result[0];
    console.log(`App ${appId} reviewed with status: ${status}`);
    
    // No event bus call here - remove this functionality directly within this API endpoint

    return res.status(200).json({ 
      message: `App ${status} successfully`,
      app: updatedApp
    });
    
  } catch (error) {
    console.error('Error reviewing app:', error);
    Sentry.captureException(error);
    
    if (error.message === 'Not authorized to review apps') {
      return res.status(403).json({ error: error.message });
    }
    
    if (error.message === 'App not found') {
      return res.status(404).json({ error: error.message });
    }
    
    if (error.message.includes('Validation failed')) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(500).json({ error: 'Failed to review app' });
  }
}