"use server";

import db from "@/lib/db";
import { SortOrder } from "@/types/common";
import { EnumStatus, Prisma } from "@prisma/client";
import dayjs from "dayjs";

export interface searchReceiptListProps {
  selectedDate: { year: string; month: string; day?: string };
  status: EnumStatus[];
  sort: SortOrder;
}

export async function getListRegister({
  selectedDate,
  status,
  sort,
}: searchReceiptListProps) {
  try {
    // const user = await getUser();
    // const store = user?.store ;
    const user = { store: [{ id: "test" }] }; //await getUser();
    const store = user?.store;

    if (!store) {
      throw "상점 정보가 존재하지 않습니다.";
    }
    const { year, month, day } = selectedDate;

    const startOfMonth = dayjs(`${year}-${Number(month)}-01`).startOf("month"); // 월의 시작일
    const endOfMonth = startOfMonth.endOf("month"); // 월의 마지막일

    // 기본 where 조건: 월의 전체 범위 (1일부터 마지막일)
    const whereCondition = {
      created_at: {
        gte: startOfMonth.toDate(), // 월의 첫 번째 날
        lte: endOfMonth.toDate(), // 월의 마지막 날
      },
    };

    // day가 'all'이 아니면 해당 날짜에만 필터링
    if (day !== "all") {
      const specificDay = dayjs(`${year}-${month}-${day}`).startOf("day"); // 특정 날짜의 시작 시간
      whereCondition.created_at = {
        gte: specificDay.toDate(), // 특정 날짜의 시작
        lte: specificDay.endOf("day").toDate(), // 특정 날짜의 끝
      };
    }

    const result = await db.receive.findMany({
      where: {
        storeId: store[0].id,
        status: {
          in: status, // 배열 내 하나라도 일치하면 매칭됨
        },
        ...whereCondition,
      },
      orderBy: {
        created_at: sort, // 'asc' = 오래된 순, 'desc' = 최신 순
      },
    });
    console.log("result", result);
    return result;
  } catch (error) {
    console.log("[error]", error);
  }
}

export type typeRegister = Prisma.PromiseReturnType<typeof getListRegister>;
export type TypeRegisterItem = NonNullable<typeRegister>[number];
