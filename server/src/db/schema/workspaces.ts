import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

import { users } from "./users";

export const workspaces = pgTable("workspaces", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 100 }).notNull(),

  slug: varchar("slug", { length: 120 })
    .notNull()
    .unique(),

  description: text("description"),

  goal: varchar("goal", { length: 255 }),

  icon: varchar("icon", { length: 50 })
    .default("book")
    .notNull(),

  color: varchar("color", { length: 20 })
    .default("#3B82F6")
    .notNull(),

  category: varchar("category", { length: 30 })
    .default("Study")
    .notNull(),

  isFavorite: boolean("is_favorite")
    .default(false)
    .notNull(),

  archived: boolean("archived")
    .default(false)
    .notNull(),

  userId: integer("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});

export type Workspace = typeof workspaces.$inferSelect;
export type NewWorkspace = typeof workspaces.$inferInsert;