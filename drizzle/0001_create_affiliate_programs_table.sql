CREATE TABLE IF NOT EXISTS "affiliate_programs" (
  "id" SERIAL PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "app_name" TEXT NOT NULL,
  "app_description" TEXT NOT NULL,
  "app_url" TEXT NOT NULL,
  "commission_structure" TEXT NOT NULL,
  "payment_terms" TEXT NOT NULL,
  "affiliate_signup_url" TEXT NOT NULL,
  "promotional_materials" TEXT,
  "status" TEXT NOT NULL DEFAULT 'pending',
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);