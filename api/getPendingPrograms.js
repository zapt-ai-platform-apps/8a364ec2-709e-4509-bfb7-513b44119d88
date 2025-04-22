import { affiliatePrograms } from '../drizzle/schema.js';
import { authenticateUser } from "./_apiUtils.js";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import Sentry from "./_sentry.js";

export default async function handler(req, res) {
  console.log('Get pending programs request received');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const user = await authenticateUser(req);
    console.log('User authenticated:', user.id);
    
    // Check if this user is an admin (has zapt.ai or mapt.events email domain)
    if (!user.email?.endsWith('@zapt.ai') && !user.email?.endsWith('@mapt.events')) {
      return res.status(403).json({ error: 'Not authorized to access pending programs' });
    }
    
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    // Get all pending programs
    const result = await db.select()
      .from(affiliatePrograms)
      .where(eq(affiliatePrograms.status, 'pending'))
      .orderBy(affiliatePrograms.createdAt);
    
    console.log(`Retrieved ${result.length} pending programs`);
    
    return res.status(200).json({ programs: result });
    
  } catch (error) {
    console.error('Error fetching pending programs:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Failed to fetch pending programs' });
  }
}