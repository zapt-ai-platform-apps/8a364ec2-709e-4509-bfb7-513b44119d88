import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { affiliatePrograms } from '../../../../drizzle/schema.js';

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
  const db = getDbClient();
  return db.select()
    .from(affiliatePrograms)
    .orderBy(affiliatePrograms.createdAt);
};

/**
 * Get apps by status
 */
export const getAppsByStatus = async (status) => {
  const db = getDbClient();
  return db.select()
    .from(affiliatePrograms)
    .where(eq(affiliatePrograms.status, status))
    .orderBy(affiliatePrograms.createdAt);
};

/**
 * Get apps by user ID
 */
export const getAppsByUser = async (userId) => {
  const db = getDbClient();
  return db.select()
    .from(affiliatePrograms)
    .where(eq(affiliatePrograms.userId, userId))
    .orderBy(affiliatePrograms.createdAt);
};

/**
 * Create a new app
 */
export const createApp = async (appData) => {
  const db = getDbClient();
  return db.insert(affiliatePrograms).values({
    ...appData,
    createdAt: new Date(),
    updatedAt: new Date()
  }).returning();
};

/**
 * Update an app's status
 */
export const updateAppStatus = async (appId, status) => {
  const db = getDbClient();
  return db.update(affiliatePrograms)
    .set({ 
      status: status,
      updatedAt: new Date()
    })
    .where(eq(affiliatePrograms.id, appId))
    .returning();
};