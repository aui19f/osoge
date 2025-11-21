"use server";

import { getUser } from "@/app/actions/getUser";
import db from "@/lib/db";
import { SearchType, SortOrder } from "@/types/common";
import dayjs from "dayjs";

export interface searchReceiptListProps {
  type: SearchType;
  value: string;
  sort: SortOrder;
}
export async function searchReceiptList({
  type,
  value,
  sort,
}: searchReceiptListProps) {
  try {
    const user = await getUser();
    const store = user?.store;

    if (!store) {
      throw "상점 정보가 존재하지 않습니다.";
    }

    const searchWhere =
      type === "phone"
        ? { phone: { contains: value } }
        : { serialCode: { contains: value } };

    return await db.receive.findMany({
      where: {
        storeId: store[0].id,
        ...searchWhere,
        created_at: {
          gte: dayjs().subtract(1, "year").toDate(), // 1년 전 현재 시각
          lte: dayjs().toDate(), // 현재 시각
        },
      },

      orderBy: {
        created_at: sort, // 'asc' = 오래된 순, 'desc' = 최신 순
      },
    });
  } catch (error) {
    console.log("[ERR]", error);
    return [];
  }
}
