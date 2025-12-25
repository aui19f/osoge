"use server";

import db from "@/lib/db";
import { SearchType, SortOrder } from "@/types/common";
import { EnumStatus } from "@prisma/client";
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
    // const user = await getUser();
    // const store = user?.store;
    const user = { store: [{ id: "test" }] }; //await getUser();
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

export async function searchRegisterById(id: string) {
  try {
    const user = { store: [{ id: "test" }] }; //await getUser();
    const store = user?.store;

    if (!store) {
      throw "상점 정보가 존재하지 않습니다.";
    }
    const result = await db.receive.findUnique({
      where: {
        storeId: store[0].id,
        id,
      },
    });
    return result;
  } catch (error) {
    console.log("[ERR]", error);
    return null;
  }
}

interface updateRegisterItemProps {
  id: string;
  type: "save" | "saveAndSend";
  price: string | number;

  paymentMethod: string;
  status: EnumStatus;
}

export async function updateRegisterItem({
  id,
  type,
  price,
  paymentMethod,
  status,
}: updateRegisterItemProps) {
  //전송여부 확인해서 전송할경우, 전송횟수증가
  if (type === "saveAndSend") {
    console.log("문자 또는 알림톡 전송");
  }

  await db.receive.update({
    where: { id },
    data: {
      price: Number(price),
      paymentMethod,
      status,

      // type에 따라 sendCount +1 또는 유지
      sendCount: type === "saveAndSend" ? { increment: 1 } : undefined,

      // status에 따라 completionAt 자동 세팅
      completionAt: status === EnumStatus.COMPLETED ? new Date() : undefined,
    },
  });

  return [];
  //수정되는 부분 수정하기
  //리턴

  //가격, 방법, 상태, 전송횟수
  //completionAt
  //sendCount
}
