import prisma from "../../lib/prisma.js";

export class AuthRepository {
  async findUserByEmail(email: string) {
    return prisma.$queryRawUnsafe("SELECT * FROM \"User\" WHERE email = $1", email);
  }
}

