import { db } from "../../db";
import { notes, tasks, workspaces } from "../../db/schema";
import { eq, and, desc, sql } from "drizzle-orm";

export class DashboardRepository {
  async getWorkspaceCount(userId: number) {
    const result = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(workspaces)
      .where(eq(workspaces.userId, userId));

    return Number(result[0]?.count ?? 0);
  }

  async getNoteCount(userId: number) {
    const result = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(notes)
      .where(eq(notes.userId, userId));

    return Number(result[0]?.count ?? 0);
  }

  async getTaskStats(userId: number) {
    const result = await db
      .select({
        status: tasks.status,
        count: sql<number>`count(*)`,
      })
      .from(tasks)
      .where(eq(tasks.userId, userId))
      .groupBy(tasks.status);

    const stats = {
      total: 0,
      todo: 0,
      inProgress: 0,
      completed: 0,
    };

    for (const row of result) {
      const count = Number(row.count);

      stats.total += count;

      if (row.status === "TODO") {
        stats.todo = count;
      }

      if (row.status === "IN_PROGRESS") {
        stats.inProgress = count;
      }

      if (row.status === "COMPLETED") {
        stats.completed = count;
      }
    }

    return stats;
  }

  async getPriorityStats(userId: number) {
    const result = await db
      .select({
        priority: tasks.priority,
        count: sql<number>`count(*)`,
      })
      .from(tasks)
      .where(eq(tasks.userId, userId))
      .groupBy(tasks.priority);

    const stats = {
      high: 0,
      medium: 0,
      low: 0,
    };

    for (const row of result) {
      const count = Number(row.count);

      if (row.priority === "HIGH") {
        stats.high = count;
      }

      if (row.priority === "MEDIUM") {
        stats.medium = count;
      }

      if (row.priority === "LOW") {
        stats.low = count;
      }
    }

    return stats;
  }

  async getRecentTasks(userId: number) {
    return db
      .select({
        id: tasks.id,
        title: tasks.title,
        status: tasks.status,
        priority: tasks.priority,
        dueDate: tasks.dueDate,
        createdAt: tasks.createdAt,
      })
      .from(tasks)
      .where(eq(tasks.userId, userId))
      .orderBy(desc(tasks.createdAt))
      .limit(5);
  }

  async getRecentNotes(userId: number) {
    return db
      .select({
        id: notes.id,
        title: notes.title,
        workspaceId: notes.workspaceId,
        isPinned: notes.isPinned,
        createdAt: notes.createdAt,
      })
      .from(notes)
      .where(eq(notes.userId, userId))
      .orderBy(desc(notes.createdAt))
      .limit(5);
  }
}

export const dashboardRepository =
  new DashboardRepository();