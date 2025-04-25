import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { appFavorites } from '../drizzle/schema.js';
import { eq, and } from 'drizzle-orm';
import { authenticateUser } from "./shared/auth.js";
import Sentry from "./shared/sentry.js";

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

    const appIdNum = parseInt(appId);
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    // Check if the favorite already exists
    const existingFavorite = await db.select()
      .from(appFavorites)
      .where(
        and(
          eq(appFavorites.userId, user.id),
          eq(appFavorites.appId, appIdNum)
        )
      );
    
    let isFavorite;
    
    if (existingFavorite.length > 0) {
      // If it exists, remove it
      await db.delete(appFavorites)
        .where(
          and(
            eq(appFavorites.userId, user.id),
            eq(appFavorites.appId, appIdNum)
          )
        );
      isFavorite = false;
    } else {
      // If it doesn't exist, add it
      await db.insert(appFavorites)
        .values({
          userId: user.id,
          appId: appIdNum
        });
      isFavorite = true;
    }
    
    await client.end();
    return res.status(200).json({ isFavorite });
  } catch (error) {
    console.error('Error toggling favorite:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
}