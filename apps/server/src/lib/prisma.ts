import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient({
  log: [],
} as never);

export default prisma;