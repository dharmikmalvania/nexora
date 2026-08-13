import { db } from "../../db";
import { tasks } from "../../db/schema";
import { and, desc, eq } from "drizzle-orm";

export class TaskRepository {
  async create(data: typeof tasks.$inferInsert) {
    const result = await db
      .insert(tasks)
      .values(data)
      .returning();

    return result[0];
  }

  async findAllByWorkspace(
    workspaceId: number,
    userId: number
  ) {
    return db
      .select()
      .from(tasks)
      .where(
        and(
          eq(tasks.workspaceId, workspaceId),
          eq(tasks.userId, userId)
        )
      )
      .orderBy(desc(tasks.createdAt));
  }

  async findById(id: number, userId: number) {
    const result = await db
      .select()
      .from(tasks)
      .where(
        and(
          eq(tasks.id, id),
          eq(tasks.userId, userId)
        )
      );

    return result[0] ?? null;
  }

  async update(
    id: number,
    userId: number,
    data: Partial<typeof tasks.$inferInsert>
  ) {
    const result = await db
      .update(tasks)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(tasks.id, id),
          eq(tasks.userId, userId)
        )
      )
      .returning();

    return result[0] ?? null;
  }

  async delete(id: number, userId: number) {
    const result = await db
      .delete(tasks)
      .where(
        and(
          eq(tasks.id, id),
          eq(tasks.userId, userId)
        )
      )
      .returning();

    return result[0] ?? null;
  }
}

export const taskRepository = new TaskRepository();