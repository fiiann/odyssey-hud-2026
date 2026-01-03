/**
 * Prisma Client Singleton
 *
 * This file exports a singleton instance of the Prisma Client to avoid
 * creating multiple instances in development (which can cause issues with
 * hot reloading and too many database connections).
 *
 * In development, we attach the Prisma Client to the global object so it
 * persists across hot module reloading.
 *
 * In production, we create a single instance that's reused across requests.
 */

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Prisma Client singleton instance
 */
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// In development, attach to global to prevent multiple instances
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
