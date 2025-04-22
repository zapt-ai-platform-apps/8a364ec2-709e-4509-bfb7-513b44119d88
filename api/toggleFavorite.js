import * as Sentry from "@sentry/node";
import { appFavorites } from '../drizzle/schema.js';
import { authenticateUser } from "./_apiUtils.js";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq, and } from 'drizzle-orm';

// Initialize Sentry
import "./_sentry.js";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await authenticateUser(req);
    const { appId } = req.body;

    if (!appId) {
      return res.status(400).json({ error: 'App ID is required' });
    }

    console.log(`Toggling favorite for user ${user.id} and app ${appId}`);

    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    // Check if the favorite already exists
    const existingFavorite = await db.select()
      .from(appFavorites)
      .where(
        and(
          eq(appFavorites.userId, user.id),
          eq(appFavorites.appId, parseInt(appId))
        )
      );

    let result;
    
    if (existingFavorite.length > 0) {
      // If it exists, remove it
      console.log('Removing existing favorite');
      result = await db.delete(appFavorites)
        .where(
          and(
            eq(appFavorites.userId, user.id),
            eq(appFavorites.appId, parseInt(appId))
          )
        );
      
      await client.end();
      return res.status(200).json({ isFavorite: false });
    } else {
      // If it doesn't exist, add it
      console.log('Adding new favorite');
      result = await db.insert(appFavorites)
        .values({
          userId: user.id,
          appId: parseInt(appId)
        });
      
      await client.end();
      return res.status(200).json({ isFavorite: true });
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
}