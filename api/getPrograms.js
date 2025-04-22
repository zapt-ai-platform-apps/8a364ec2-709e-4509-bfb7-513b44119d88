import { affiliatePrograms } from '../drizzle/schema.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import Sentry from "./_sentry.js";

export default async function handler(req, res) {
  console.log('Get programs request received');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    // Get approved programs for the marketplace
    const result = await db.select()
      .from(affiliatePrograms)
      .where(eq(affiliatePrograms.status, 'approved'))
      .orderBy(affiliatePrograms.createdAt);
    
    console.log(`Retrieved ${result.length} approved programs`);
    
    return res.status(200).json({ programs: result });
    
  } catch (error) {
    console.error('Error fetching programs:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Failed to fetch programs' });
  }
}