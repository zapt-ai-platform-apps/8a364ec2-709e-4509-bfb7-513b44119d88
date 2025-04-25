import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { waitlistEntries } from '../drizzle/schema.js';
import { authenticateUser } from "./shared/auth.js";
import Sentry from "./shared/sentry.js";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const user = await authenticateUser(req);
    console.log('User authenticated:', user.id);

    // Check admin privileges
    if (!user.email?.endsWith('@zapt.ai') && !user.email?.endsWith('@mapt.events')) {
      throw new Error('Not authorized to access waitlist entries');
    }
    
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    const entries = await db.select()
      .from(waitlistEntries)
      .orderBy(waitlistEntries.createdAt);
    
    await client.end();
    
    console.log(`Retrieved ${entries.length} waitlist entries`);
    
    return res.status(200).json({ entries });
  } catch (error) {
    console.error('Error fetching waitlist entries:', error);
    Sentry.captureException(error);
    
    if (error.message === 'Not authorized to access waitlist entries') {
      return res.status(403).json({ error: error.message });
    }
    
    return res.status(500).json({ error: 'Failed to fetch waitlist entries' });
  }
}