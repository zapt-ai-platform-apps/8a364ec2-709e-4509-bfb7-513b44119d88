import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { waitlistEntries } from '../drizzle/schema.js';
import Sentry from "./shared/sentry.js";
import { Resend } from 'resend';

/**
 * Send email notification about a new waitlist entry
 */
const sendWaitlistEmail = async (waitlistEntry) => {
  try {
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'ZAPT Affiliate Marketplace <noreply@zapt.ai>',
        to: 'david@zapt.ai',
        subject: 'New Waitlist Submission',
        html: `
          <h1>New Waitlist Submission</h1>
          <p>A new user has joined the waitlist:</p>
          <ul>
            <li><strong>Email:</strong> ${waitlistEntry.email}</li>
            ${waitlistEntry.desiredApps ? `<li><strong>Desired Apps:</strong> ${waitlistEntry.desiredApps}</li>` : ''}
            ${waitlistEntry.feedback ? `<li><strong>Feedback:</strong> ${waitlistEntry.feedback}</li>` : ''}
          </ul>
          <p>Date: ${new Date(waitlistEntry.createdAt).toLocaleString()}</p>
        `,
      });
      console.log('Waitlist email notification sent');
    } else {
      console.log('Skipping waitlist email notification: RESEND_API_KEY not configured');
    }
  } catch (error) {
    console.error('Error sending waitlist email notification:', error);
    Sentry.captureException(error);
    // Don't throw the error, just log it
  }
};

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
    
    // Send email notification directly in this API endpoint
    await sendWaitlistEmail(result[0]);
    
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
