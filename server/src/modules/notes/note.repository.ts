import { db } from "../../db";
import { notes } from "../../db/schema";
import { and, desc, eq } from "drizzle-orm";

export class NoteRepository {
  async create(data: typeof notes.$inferInsert) {
    const result = await db
      .insert(notes)
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
      .from(notes)
      .where(
        and(
          eq(notes.workspaceId, workspaceId),
          eq(notes.userId, userId)
        )
      )
      .orderBy(desc(notes.createdAt));
  }

  async findById(id: number, userId: number) {
    const result = await db
      .select()
      .from(notes)
      .where(
        and(
          eq(notes.id, id),
          eq(notes.userId, userId)
        )
      );

    return result[0] ?? null;
  }

  async update(
    id: number,
    userId: number,
    data: Partial<typeof notes.$inferInsert>
  ) {
    const result = await db
      .update(notes)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(notes.id, id),
          eq(notes.userId, userId)
        )
      )
      .returning();

    return result[0] ?? null;
  }

  async delete(id: number, userId: number) {
    const result = await db
      .delete(notes)
      .where(
        and(
          eq(notes.id, id),
          eq(notes.userId, userId)
        )
      )
      .returning();

    return result[0] ?? null;
  }
}

export const noteRepository = new NoteRepository();