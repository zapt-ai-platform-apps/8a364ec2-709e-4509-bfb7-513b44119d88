import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { appFavorites } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';
import { authenticateUser } from "./shared/auth.js";
import Sentry from "./shared/sentry.js";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await authenticateUser(req);
    console.log(`Getting favorites for user ${user.id}`);

    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    const favorites = await db.select()
      .from(appFavorites)
      .where(eq(appFavorites.userId, user.id));

    await client.end();

    // Return just the app IDs for simplicity
    const favoriteAppIds = favorites.map(fav => fav.appId);
    return res.status(200).json({ favorites: favoriteAppIds });
  } catch (error) {
    console.error('Error getting favorites:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
}