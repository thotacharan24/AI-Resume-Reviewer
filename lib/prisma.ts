import { PrismaClient } from '@prisma/client';

// Ensure a single PrismaClient instance in development to avoid connection
// exhaustion when Next.js hot reloads modules.
declare global {
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClient | undefined;
}

const prisma = global.__prisma__ ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.__prisma__ = prisma;

export default prisma;
