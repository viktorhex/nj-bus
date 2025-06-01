// scripts/sync-migrations.ts
import { readdirSync, copyFileSync } from "fs";
import { join } from "path";

const drizzleDir = "./drizzle";
const supabaseDir = "./supabase/migrations";

// Get the latest migration file from drizzle/
const migrationFiles = readdirSync(drizzleDir)
  .filter(file => file.endsWith(".sql"))
  .sort(); // Sort to get the latest file (Drizzle uses sequential numbering)
const latestMigration = migrationFiles[migrationFiles.length - 1];

if (!latestMigration) {
  console.error("No migration files found in drizzle/");
  process.exit(1);
}

// Generate timestamp for Supabase migration (YYYYMMDDHHMMSS)
const timestamp = new Date()
  .toISOString()
  .replace(/[-:T]/g, "")
  .slice(0, 14); // e.g., 20250601163000

// Define migration name (remove Drizzle's random suffix, e.g., "spiffy_nightcrawler")
const migrationName = latestMigration
  .replace(/^\d{4}_/, "") // Remove leading "0000_"
  .replace(/\.sql$/, ""); // Remove ".sql"
const supabaseMigrationName = `${timestamp}_${migrationName}.sql`;

// Copy to supabase/migrations/
copyFileSync(
  join(drizzleDir, latestMigration),
  join(supabaseDir, supabaseMigrationName)
);
console.log(`Copied ${latestMigration} to ${supabaseMigrationName}`);