"use server";
import db from "@/lib/db";
export default async function getItems(id: string) {
  return await db.receive.findUnique({
    where: {
      id,
    },
  });
}
