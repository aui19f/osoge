import { SearchParams } from "@/app/(auth)/master/search/actions";
import db from "@/lib/db";

export async function searchByCode({ value }: SearchParams) {
  return await db.receive.findMany({
    where: {
      serialCode: {
        contains: value,
      },
    },
    select: {
      id: true,
      phone: true,
      updated_at: true,
      status: true,
      serialCode: true,
      created_at: true,
    },
  });
}
