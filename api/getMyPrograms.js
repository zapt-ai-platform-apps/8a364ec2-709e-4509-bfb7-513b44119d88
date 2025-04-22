import { affiliatePrograms } from '../drizzle/schema.js';
import { authenticateUser } from "./_apiUtils.js";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import Sentry from "./_sentry.js";

export default async function handler(req, res) {
  console.log('Get my programs request received');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const user = await authenticateUser(req);
    console.log('User authenticated:', user.id);
    
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    // Get all programs submitted by this user
    const result = await db.select()
      .from(affiliatePrograms)
      .where(eq(affiliatePrograms.userId, user.id))
      .orderBy(affiliatePrograms.createdAt);
    
    console.log(`Retrieved ${result.length} programs for user ${user.id}`);
    
    return res.status(200).json({ programs: result });
    
  } catch (error) {
    console.error('Error fetching user programs:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Failed to fetch programs' });
  }
}