import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { appFavorites } from '../../drizzle/schema.js';
import { eq, and } from 'drizzle-orm';
import Sentry from '../shared/sentry.js';

/**
 * Get a Drizzle DB client
 */
export const getDbClient = () => {
  const client = postgres(process.env.COCKROACH_DB_URL);
  return drizzle(client);
};

export const favoritesService = {
  /**
   * Get all favorite apps for a user
   */
  getUserFavorites: async (userId) => {
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    const favorites = await db.select()
      .from(appFavorites)
      .where(eq(appFavorites.userId, userId));

    await client.end();

    // Return just the app IDs for simplicity
    const favoriteAppIds = favorites.map(fav => fav.appId);
    return { favorites: favoriteAppIds };
  },
  
  /**
   * Toggle favorite status for an app
   */
  toggleFavorite: async (userId, appId) => {
    if (!userId || !appId) {
      throw new Error('User ID and App ID are required');
    }
    
    const appIdNum = parseInt(appId);
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    // Check if the favorite already exists
    const existingFavorite = await db.select()
      .from(appFavorites)
      .where(
        and(
          eq(appFavorites.userId, userId),
          eq(appFavorites.appId, appIdNum)
        )
      );
    
    let isFavorite;
    
    if (existingFavorite.length > 0) {
      // If it exists, remove it
      await db.delete(appFavorites)
        .where(
          and(
            eq(appFavorites.userId, userId),
            eq(appFavorites.appId, appIdNum)
          )
        );
      isFavorite = false;
    } else {
      // If it doesn't exist, add it
      await db.insert(appFavorites)
        .values({
          userId: userId,
          appId: appIdNum
        });
      isFavorite = true;
    }
    
    await client.end();
    return { isFavorite };
  }
};