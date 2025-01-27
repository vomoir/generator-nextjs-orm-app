import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const responses = sqliteTable("responses", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  timeStamp: text("timestamp")
    .notNull()
    .default(sql`(datetime(current_timestamp, 'localtime'))`),
});

export type ResponseSelect = typeof responses.$inferSelect;
