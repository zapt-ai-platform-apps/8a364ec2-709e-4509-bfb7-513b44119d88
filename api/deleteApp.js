import { affiliatePrograms } from '../drizzle/schema.js';
import { authenticateUser } from "./shared/auth.js";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq, and } from 'drizzle-orm';
import * as Sentry from '@sentry/node';

// Initialize Sentry
Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID
    }
  }
});

export default async function handler(req, res) {
  // Only allow DELETE method
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    console.log('Received request to delete app');
    console.log('Request URL:', req.url);
    console.log('Request method:', req.method);
    
    // Authenticate the user
    const user = await authenticateUser(req);
    if (!user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Fix: Parse the URL to ensure we get the query parameters correctly
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const appId = url.searchParams.get('appId');
    
    console.log('Parsed URL:', url.toString());
    console.log('Request query parameters:', Object.fromEntries(url.searchParams));
    console.log('App ID from URL:', appId);
    
    if (!appId) {
      return res.status(400).json({ error: 'App ID is required' });
    }

    console.log(`Attempting to delete app ID: ${appId} for user: ${user.id}`);

    // Initialize database connection
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    // Only allow users to delete their own apps
    const result = await db.delete(affiliatePrograms)
      .where(
        and(
          eq(affiliatePrograms.id, appId),
          eq(affiliatePrograms.userId, user.id)
        )
      )
      .returning({ id: affiliatePrograms.id });

    await client.end();

    // If no app was deleted, it might not exist or might not belong to this user
    if (!result.length) {
      console.log(`No app found with ID ${appId} belonging to user ${user.id}`);
      return res.status(404).json({ error: 'App not found or you do not have permission to delete it' });
    }

    console.log(`Successfully deleted app ID: ${appId}`);
    return res.status(200).json({ message: 'App deleted successfully', id: appId });

  } catch (error) {
    console.error('Error deleting app:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Failed to delete app' });
  }
}