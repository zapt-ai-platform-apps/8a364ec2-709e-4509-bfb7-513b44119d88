CREATE TABLE IF NOT EXISTS "app_favorites" (
  "id" SERIAL PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "app_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  UNIQUE ("user_id", "app_id")
);