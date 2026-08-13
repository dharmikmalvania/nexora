import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

import { users } from "./users";
import { workspaces } from "./workspaces";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),

  title: varchar("title", { length: 200 }).notNull(),

  description: text("description"),

  status: varchar("status", { length: 30 })
    .default("TODO")
    .notNull(),

  priority: varchar("priority", { length: 20 })
    .default("MEDIUM")
    .notNull(),

  dueDate: timestamp("due_date"),

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

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;