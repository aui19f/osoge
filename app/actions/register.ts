"use server";

import db from "@/lib/db";
import { ReceiptFormValues } from "@/schemas/register";
import { SearchBarInputProps } from "@/schemas/search";
import { Prisma } from "@prisma/client";

export async function selectListRegister({
  id,
  status,
  sort,
  word,
  created_at,
}: SearchBarInputProps) {
  return await db.receive.findMany({
    where: {
      storeId: id,
      ...(created_at && created_at.get && created_at.lte && { ...created_at }),
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
  return await db.receive.findUnique({
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
    return await db.receive.update({
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
