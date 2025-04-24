CREATE TABLE IF NOT EXISTS "waitlist_entries" (
  "id" SERIAL PRIMARY KEY,
  "email" TEXT NOT NULL,
  "feedback" TEXT,
  "desired_apps" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW()
);