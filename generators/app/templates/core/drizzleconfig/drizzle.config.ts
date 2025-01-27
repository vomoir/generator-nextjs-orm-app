import "dotenv/config";
//import { defineConfig } from "drizzle-kit";
import { Config } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("No process.env.DATABASE_URL found");
}

export default {
  schema: "./<%= srcPath %>/db/schemas.ts",
  out: "./<%= srcPath %>/db/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
