import { db } from "../../db";
import { workspaces } from "../../db/schema";
import { and, eq } from "drizzle-orm";

export class WorkspaceRepository {
  async create(data: typeof workspaces.$inferInsert) {
    const result = await db
      .insert(workspaces)
      .values(data)
      .returning();

    return result[0];
  }

  async findBySlug(slug: string, userId: number) {
    const result = await db
      .select()
      .from(workspaces)
      .where(
        and(
          eq(workspaces.slug, slug),
          eq(workspaces.userId, userId)
        )
      );

    return result[0] ?? null;
  }

  async findAllByUser(userId: number) {
    return db
      .select()
      .from(workspaces)
      .where(eq(workspaces.userId, userId));
  }

  async findById(id: number, userId: number) {
    const result = await db
      .select()
      .from(workspaces)
      .where(
        and(
          eq(workspaces.id, id),
          eq(workspaces.userId, userId)
        )
      );

    return result[0] ?? null;
  }

  async update(
    id: number,
    userId: number,
    data: Partial<typeof workspaces.$inferInsert>
  ) {
    const result = await db
      .update(workspaces)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(workspaces.id, id),
          eq(workspaces.userId, userId)
        )
      )
      .returning();

    return result[0] ?? null;
  }

  async delete(id: number, userId: number) {
    const result = await db
      .delete(workspaces)
      .where(
        and(
          eq(workspaces.id, id),
          eq(workspaces.userId, userId)
        )
      )
      .returning();

    return result[0] ?? null;
  }
}

export const workspaceRepository = new WorkspaceRepository();