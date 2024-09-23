import { Config } from "drizzle-kit";
import process from 'node:process';

process.loadEnvFile();

export default {
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;
