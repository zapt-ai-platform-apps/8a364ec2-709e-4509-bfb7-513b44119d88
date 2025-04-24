import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { waitlistEntries } from '../drizzle/schema.js';
import Sentry from "./_sentry.js";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, feedback, desiredApps } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    console.log('Submitting waitlist entry:', { email, feedback: feedback?.substring(0, 50) });

    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    const result = await db.insert(waitlistEntries).values({
      email,
      feedback,
      desiredApps,
      createdAt: new Date()
    }).returning();

    await client.end();

    console.log('Successfully added to waitlist:', email);

    return res.status(201).json({ 
      message: 'Successfully joined waitlist',
      entry: result[0]
    });
  } catch (error) {
    console.error('Error submitting to waitlist:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
}