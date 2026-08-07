import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export class UserRepository {
  async findByEmail(email: string) {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return result[0] ?? null;
  }

  async findByUsername(username: string) {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    return result[0] ?? null;
  }

  async create(data: typeof users.$inferInsert) {
    const result = await db
      .insert(users)
      .values(data)
      .returning();

    return result[0];
  }
}

export const userRepository = new UserRepository();