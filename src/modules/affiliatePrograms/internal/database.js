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
 * Get all affiliate programs
 */
export const getAllPrograms = async () => {
  const db = getDbClient();
  return db.select()
    .from(affiliatePrograms)
    .orderBy(affiliatePrograms.createdAt);
};

/**
 * Get programs by status
 */
export const getProgramsByStatus = async (status) => {
  const db = getDbClient();
  return db.select()
    .from(affiliatePrograms)
    .where(eq(affiliatePrograms.status, status))
    .orderBy(affiliatePrograms.createdAt);
};

/**
 * Get programs by user ID
 */
export const getProgramsByUser = async (userId) => {
  const db = getDbClient();
  return db.select()
    .from(affiliatePrograms)
    .where(eq(affiliatePrograms.userId, userId))
    .orderBy(affiliatePrograms.createdAt);
};

/**
 * Create a new program
 */
export const createProgram = async (programData) => {
  const db = getDbClient();
  return db.insert(affiliatePrograms).values({
    ...programData,
    createdAt: new Date(),
    updatedAt: new Date()
  }).returning();
};

/**
 * Update a program's status
 */
export const updateProgramStatus = async (programId, status) => {
  const db = getDbClient();
  return db.update(affiliatePrograms)
    .set({ 
      status: status,
      updatedAt: new Date()
    })
    .where(eq(affiliatePrograms.id, programId))
    .returning();
};