"use server";
import db from "@/lib/db";
import getSession from "@/lib/sesstion";
import { EnumStatus, Prisma } from "@prisma/client";
import dayjs from "dayjs";

type listProps = {
  enumStatuses: EnumStatus[];
  date: string;

  skipNum: number;
  takeNum: number;
};

export type InitialgetList = Prisma.PromiseReturnType<typeof getList>;

// 배열의 요소 타입
export type ItemOfInitialgetList = InitialgetList[number];

export async function getListCount() {}

export async function getList({
  enumStatuses,
  date,
  skipNum,
  takeNum,
}: listProps) {
  const session = await getSession();

  const startDate = dayjs(date + "", "YYYY-MM")
    .startOf("month")
    .toDate();

  const endDate = dayjs(date + "", "YYYY-MM")
    .endOf("month")
    .toDate();

  const result = await db.receive.findMany({
    skip: skipNum,
    take: takeNum,
    where: {
      usersId: session.id!,
      created_at: {
        gte: startDate, // Greater Than or Equal (시작일 포함)
        lte: endDate, // Less Than or Equal (마지막일 포함)
      },
      ...(enumStatuses.length > 0 && {
        status: { in: enumStatuses },
      }),
    },
    orderBy: {
      updated_at: "desc",
    },
    select: {
      id: true,
      created_at: true,
      status: true,
      phone: true,
      serialCode: true,
    },
  });

  console.log("result", result);
  return result;
}
