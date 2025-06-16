"use server";
import db from "@/lib/db";
import getSession from "@/lib/sesstion";
import { Prisma } from "@prisma/client";

export type InitialReceive = Prisma.PromiseReturnType<typeof fetchReceiveList>;

export default async function fetchReceiveList() {
  const session = await getSession();

  return await db.receive.findMany({
    where: {
      usersId: session.id!,
    },
    select: {
      id: true,
      created_at: true,
      updated_at: true,
      status: true,
      phone: true,
    },
  });
}
