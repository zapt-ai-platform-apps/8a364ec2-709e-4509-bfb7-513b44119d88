import { pgTable, serial, text, timestamp, integer, unique } from 'drizzle-orm/pg-core';

export const affiliatePrograms = pgTable('affiliate_programs', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  userEmail: text('user_email'),
  appName: text('app_name').notNull(),
  appDescription: text('app_description').notNull(),
  appUrl: text('app_url').notNull(),
  commissionStructure: text('commission_structure').notNull(),
  paymentTerms: text('payment_terms').notNull(),
  affiliateSignupUrl: text('affiliate_signup_url').notNull(),
  promotionalMaterials: text('promotional_materials'),
  status: text('status').notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const appFavorites = pgTable('app_favorites', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  appId: integer('app_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => {
  return {
    uniqueUserApp: unique().on(table.userId, table.appId),
  };
});

export const waitlistEntries = pgTable('waitlist_entries', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  feedback: text('feedback'),
  desiredApps: text('desired_apps'),
  createdAt: timestamp('created_at').defaultNow()
});