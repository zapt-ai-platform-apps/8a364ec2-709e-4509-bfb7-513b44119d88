import { affiliatePrograms } from '../drizzle/schema.js';
import { authenticateUser } from "./_apiUtils.js";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import Sentry from "./_sentry.js";

export default async function handler(req, res) {
  console.log('Review program request received');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const user = await authenticateUser(req);
    console.log('User authenticated:', user.id);
    
    // Check if this user is an admin (has zapt.ai or mapt.events email domain)
    if (!user.email?.endsWith('@zapt.ai') && !user.email?.endsWith('@mapt.events')) {
      return res.status(403).json({ error: 'Not authorized to review programs' });
    }
    
    const { programId, status } = req.body;
    
    if (!programId || !status) {
      return res.status(400).json({ error: 'Missing programId or status' });
    }
    
    if (status !== 'approved' && status !== 'rejected') {
      return res.status(400).json({ error: 'Status must be approved or rejected' });
    }
    
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    // Update the program status
    const result = await db.update(affiliatePrograms)
      .set({ 
        status: status,
        updatedAt: new Date()
      })
      .where(eq(affiliatePrograms.id, parseInt(programId)))
      .returning();
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Program not found' });
    }
    
    console.log(`Program ${programId} reviewed with status: ${status}`);
    
    return res.status(200).json({ 
      message: `Program ${status} successfully`,
      program: result[0]
    });
    
  } catch (error) {
    console.error('Error reviewing program:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Failed to review program' });
  }
}