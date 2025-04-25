import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { affiliatePrograms } from '../drizzle/schema.js';
import { authenticateUser } from "./shared/auth.js";
import Sentry from "./shared/sentry.js";

export default async function handler(req, res) {
  console.log('Get pending apps request received');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const user = await authenticateUser(req);
    console.log('User authenticated:', user.id);
    
    // Check admin privileges
    if (!user.email?.endsWith('@zapt.ai') && !user.email?.endsWith('@mapt.events')) {
      throw new Error('Not authorized to access pending apps');
    }
    
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    const apps = await db.select()
      .from(affiliatePrograms)
      .where(eq(affiliatePrograms.status, 'pending'))
      .orderBy(affiliatePrograms.createdAt);
      
    await client.end();
    
    console.log(`Retrieved ${apps.length} pending apps`);
    
    return res.status(200).json({ apps });
    
  } catch (error) {
    console.error('Error fetching pending apps:', error);
    Sentry.captureException(error);
    
    if (error.message === 'Not authorized to access pending apps') {
      return res.status(403).json({ error: error.message });
    }
    
    return res.status(500).json({ error: 'Failed to fetch pending apps' });
  }
}