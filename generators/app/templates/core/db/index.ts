import {
  drizzle,
  type BetterSQLite3Database,
} from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import "dotenv/config";
import * as schema from "./schemas";

process.loadEnvFile();
const sqlite = new Database(process.env.DATABASE_URL);

console.log(`***In <%= srcPath %>/db/index.ts: ${process.env.DATABASE_URL}`);

// export const db = drizzle(sqlite);
export const db: BetterSQLite3Database<typeof schema> = drizzle(sqlite, {
  // to use query builders like findMany()
  schema,
});
