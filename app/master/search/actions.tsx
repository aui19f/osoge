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

export async function searchRegisterById(id: string) {
  try {
    console.log(id);
    const user = await getUser();
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
    console.log("[result]", result);
    return result;
  } catch (error) {
    console.log("[ERR]", error);
    return null;
  }
}

// interface updateRegisterItemProps {
//   id: string
//   type: 'save' | 'saveToSend'
//   price: string | number

//   paymentMethod: string
// }

// export async function updateRegisterItem({params}:updateRegisterItemProps) {

//   //전송여부 확인해서 전송할경우, 전송횟수증가
//   //수정되는 부분 수정하기
//   //리턴

//   //가격, 방법, 상태, 전송횟수
// //completionAt
// //sendCount
// }
