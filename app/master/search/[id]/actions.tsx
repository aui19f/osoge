"use server";

import { EnumNextStatus } from "@/lib/constants/status";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function fetchReceiveById(id: string) {
  return await db.receive.findUnique({
    where: {
      id,
    },
  });
}

export type InitialReceiveDetail = Prisma.PromiseReturnType<
  typeof fetchReceiveById
>;

export async function updateReceiveStatus(id: string, status: EnumNextStatus) {
  return await db.receive.update({
    where: { id },
    data: { status, updated_at: new Date() },
  });
}
