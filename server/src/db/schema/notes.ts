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
import { workspaces } from "./workspaces";

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),

  title: varchar("title", { length: 200 }).notNull(),

  content: text("content").notNull(),

  workspaceId: integer("workspace_id")
    .references(() => workspaces.id, {
      onDelete: "cascade",
    })
    .notNull(),

  userId: integer("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),

  isPinned: boolean("is_pinned")
    .default(false)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});

export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;