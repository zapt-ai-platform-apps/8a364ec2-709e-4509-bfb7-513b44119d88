import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { waitlistEntries } from '../../drizzle/schema.js';
import Sentry from '../shared/sentry.js';
import { Resend } from 'resend';

/**
 * Get a Drizzle DB client
 */
export const getDbClient = () => {
  const client = postgres(process.env.COCKROACH_DB_URL);
  return drizzle(client);
};

/**
 * Send email notification about a new waitlist entry
 */
const sendWaitlistEmail = async (waitlistEntry) => {
  try {
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'ZAPT Affiliate Marketplace <notifications@zapt.ai>',
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

export const waitlistService = {
  /**
   * Get all waitlist entries (admin only)
   */
  getEntries: async (user) => {
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
    
    return { entries };
  },
  
  /**
   * Submit a new waitlist entry
   */
  submitEntry: async (entryData) => {
    const { email, feedback, desiredApps } = entryData;
    
    if (!email) {
      throw new Error('Email is required');
    }
    
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    const result = await db.insert(waitlistEntries).values({
      email,
      feedback,
      desiredApps,
      createdAt: new Date()
    }).returning();

    await client.end();
    
    // Send email notification
    await sendWaitlistEmail(result[0]);
    
    return { 
      message: 'Successfully joined waitlist',
      entry: result[0]
    };
  }
};