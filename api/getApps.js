import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { affiliatePrograms } from '../drizzle/schema.js';
import Sentry from "./shared/sentry.js";

export default async function handler(req, res) {
  console.log('Get apps request received');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Get apps with approved status
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    const apps = await db.select()
      .from(affiliatePrograms)
      .where(eq(affiliatePrograms.status, 'approved'))
      .orderBy(affiliatePrograms.createdAt);
      
    await client.end();
    
    console.log(`Retrieved ${apps.length} approved apps`);
    
    return res.status(200).json({ apps });
    
  } catch (error) {
    console.error('Error fetching apps:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Failed to fetch apps' });
  }
}