"use server";

import { prisma } from "@/lib/prisma";
import { ReceiptFormValues } from "@/schemas/register";
import { SearchBarInputProps } from "@/schemas/search";
import type { Prisma } from "@prisma/client"; // 타입 계산용 (Type)

export async function selectListRegister({
  id,
  status,
  sort,
  word,
  created_at,
}: SearchBarInputProps) {

  return await prisma.receive.findMany({

    where: {
      storeId: id,
      ...(created_at && created_at.gte && created_at.lte && { ...created_at }),
      status: {
        in: status,
      },
      ...(word && {
        OR: [
          {
            display_id: {
              contains: word,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: word,
              mode: "insensitive",
            },
          },
        ],
      }),
    },
    orderBy: {
      created_at: sort,
    },
  });
}

// 단일 조회 (상세)
export async function selectRegisterById(id: string) {
  return await prisma.receive.findUnique({
    where: {
      id,
    },
  });
}

export type selectRegisterByIdRes = Prisma.PromiseReturnType<
  typeof selectRegisterById
>;

export type selectRegisterByIdItemRes = NonNullable<selectRegisterByIdRes>;

// 3. 수정 (Update)
export async function updateRegister(params: ReceiptFormValues) {
  const { id, price, paymentMethod, status, memo, saveType } = params;

  try {
    return await prisma.receive.update({
      where: { id },
      data: {
        price,
        paymentMethod,
        status,
        memo,
        updated_at: new Date(),
        ...(saveType === "send" && {
          sendCount: {
            increment: 1,
          },
        }),
      },
    });
  } catch (error) {
    return { status: 500, message: "업데이트 중 에러가 발생했습니다.", error };
  }

  // DB 수정 로직...
  // 수정 후에는 해당 경로의 캐시를 새로고침하라고 명령할 수 있습니다.
  // revalidatePath("/master/list");
}

// // 4. 삭제 (Delete)
// export async function deleteRegister(id: string) { ... }

export async function getReceiveStatsStatistics(
  storeId: string,
  threeMonthsAgo: Date,
  startOfToday: Date
) {
  const statsByStatus = await prisma.receive.groupBy({
    by: ["status"],
    where: {
      storeId: storeId,
      created_at: {
        gte: threeMonthsAgo,
      },
    },
    _count: {
      _all: true,
    },
  });

  // 3. 오늘 기준 총 접수 카운트
  const todayTotalCount = await prisma.receive.count({
    where: {
      storeId: storeId,
      created_at: {
        gte: startOfToday,
      },
    },
  });

  // 데이터 가공
  const threeMonthTotal = statsByStatus.reduce(
    (acc, curr) => acc + curr._count._all,
    0
  );
  const statusCounts = statsByStatus.reduce((acc, curr) => {
    acc[curr.status] = curr._count._all;
    return acc;
  }, {} as Record<string, number>);

  return {
    threeMonthTotal,
    statusCounts, // { READY: 10, PROGRESS: 5, DONE: 20, CANCEL: 2 } 형식
    todayTotalCount,
  };
}

interface countByDate {
  storeId: string;
  startDate: Date;
  endDate: Date;
}
export async function selectThreeMonthStats(params: countByDate) {
  const { storeId, startDate, endDate } = params;
  return await prisma.receive.groupBy({
    by: ["status"],
    where: {
      storeId: storeId,
      created_at: {
        gte: startDate,
        lte: endDate,
      },
    },
    _count: {
      _all: true,
    },
  });
}

export async function selectTodayRegisterCount(params: countByDate) {
  const { storeId, startDate, endDate } = params;
  const count = await prisma.receive.count({
    where: {
      storeId: storeId,
      created_at: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  return count;
}
