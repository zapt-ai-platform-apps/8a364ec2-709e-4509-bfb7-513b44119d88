import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const affiliatePrograms = pgTable('affiliate_programs', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
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