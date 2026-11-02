import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const birdAccounts = sqliteTable("bird_accounts", {
 userId: text("user_id").primaryKey(),
 payload: text("payload").notNull(),
 revision: integer("revision").notNull().default(1),
 updatedAt: text("updated_at").notNull(),
});
