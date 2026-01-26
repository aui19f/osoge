// lib/prisma.ts

export const dynamic = "force-dynamic";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// export const prisma =

//   globalForPrisma.prisma ??
//   new PrismaClient({

//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

//테스트방법
export const prisma =
  globalForPrisma.prisma ??
  (() => {
    console.log("🐘 [Prisma] DB 커넥션을 새로 생성합니다.");
    return new PrismaClient({ log: ["query", "info", "warn", "error"] });
  })();

// console.log("\n새로운 Prisma인스턴스가 생성되었습니다.\n");
