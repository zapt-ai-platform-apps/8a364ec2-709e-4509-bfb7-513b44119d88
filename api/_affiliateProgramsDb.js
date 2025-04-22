import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { affiliatePrograms } from '../drizzle/schema.js';
import Sentry from './_sentry.js';

/**
 * Get a Drizzle DB client
 */
export const getDbClient = () => {
  const client = postgres(process.env.COCKROACH_DB_URL);
  return drizzle(client);
};

/**
 * Get all affiliate programs
 */
export const getAllPrograms = async () => {
  try {
    const db = getDbClient();
    return db.select()
      .from(affiliatePrograms)
      .orderBy(affiliatePrograms.createdAt);
  } catch (error) {
    console.error('Database error in getAllPrograms:', error);
    Sentry.captureException(error);
    throw error;
  }
};

/**
 * Get programs by status
 */
export const getProgramsByStatus = async (status) => {
  try {
    const db = getDbClient();
    return db.select()
      .from(affiliatePrograms)
      .where(eq(affiliatePrograms.status, status))
      .orderBy(affiliatePrograms.createdAt);
  } catch (error) {
    console.error(`Database error in getProgramsByStatus(${status}):`, error);
    Sentry.captureException(error);
    throw error;
  }
};

/**
 * Get programs by user ID
 */
export const getProgramsByUser = async (userId) => {
  try {
    const db = getDbClient();
    return db.select()
      .from(affiliatePrograms)
      .where(eq(affiliatePrograms.userId, userId))
      .orderBy(affiliatePrograms.createdAt);
  } catch (error) {
    console.error(`Database error in getProgramsByUser(${userId}):`, error);
    Sentry.captureException(error);
    throw error;
  }
};

/**
 * Create a new program
 */
export const createProgram = async (programData) => {
  try {
    const db = getDbClient();
    return db.insert(affiliatePrograms).values({
      ...programData,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
  } catch (error) {
    console.error('Database error in createProgram:', error);
    Sentry.captureException(error);
    throw error;
  }
};

/**
 * Update a program's status
 */
export const updateProgramStatus = async (programId, status) => {
  try {
    const db = getDbClient();
    return db.update(affiliatePrograms)
      .set({ 
        status: status,
        updatedAt: new Date()
      })
      .where(eq(affiliatePrograms.id, programId))
      .returning();
  } catch (error) {
    console.error(`Database error in updateProgramStatus(${programId}, ${status}):`, error);
    Sentry.captureException(error);
    throw error;
  }
};