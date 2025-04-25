import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { affiliatePrograms } from '../../../drizzle/schema.js';
import Sentry from '../../utils/sentry.js';

/**
 * Get a Drizzle DB client
 */
export const getDbClient = () => {
  const client = postgres(process.env.COCKROACH_DB_URL);
  return drizzle(client);
};

/**
 * Get all affiliate apps
 */
export const getAllApps = async () => {
  try {
    const db = getDbClient();
    return db.select()
      .from(affiliatePrograms)
      .orderBy(affiliatePrograms.createdAt);
  } catch (error) {
    console.error('Database error in getAllApps:', error);
    Sentry.captureException(error);
    throw error;
  }
};

/**
 * Get apps by status
 */
export const getAppsByStatus = async (status) => {
  try {
    const db = getDbClient();
    return db.select()
      .from(affiliatePrograms)
      .where(eq(affiliatePrograms.status, status))
      .orderBy(affiliatePrograms.createdAt);
  } catch (error) {
    console.error(`Database error in getAppsByStatus(${status}):`, error);
    Sentry.captureException(error);
    throw error;
  }
};

/**
 * Get apps by user ID
 */
export const getAppsByUser = async (userId) => {
  try {
    const db = getDbClient();
    return db.select()
      .from(affiliatePrograms)
      .where(eq(affiliatePrograms.userId, userId))
      .orderBy(affiliatePrograms.createdAt);
  } catch (error) {
    console.error(`Database error in getAppsByUser(${userId}):`, error);
    Sentry.captureException(error);
    throw error;
  }
};

/**
 * Create a new app
 */
export const createApp = async (appData) => {
  try {
    const db = getDbClient();
    return db.insert(affiliatePrograms).values({
      ...appData,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
  } catch (error) {
    console.error('Database error in createApp:', error);
    Sentry.captureException(error);
    throw error;
  }
};

/**
 * Update an app's status
 */
export const updateAppStatus = async (appId, status) => {
  try {
    const db = getDbClient();
    return db.update(affiliatePrograms)
      .set({ 
        status: status,
        updatedAt: new Date()
      })
      .where(eq(affiliatePrograms.id, appId))
      .returning();
  } catch (error) {
    console.error(`Database error in updateAppStatus(${appId}, ${status}):`, error);
    Sentry.captureException(error);
    throw error;
  }
};