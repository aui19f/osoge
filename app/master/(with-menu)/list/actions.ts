"use server";

// import { getUser } from "@/app/actions/getUser";
import db from "@/lib/db";
import { updateReceiptSchema } from "@/schemas/register";
import { SearchBarInput } from "@/schemas/search";
import { Prisma } from "@prisma/client";

export async function getListRegister(params: SearchBarInput) {
  const { type, date, status, sort, word } = params;

  try {
    // const { storeIds } = await getUser();
    // if (storeIds.length === 0) throw new Error("관리중인 매장이 없습니다.");

    const result = await db.receive.findMany({
      where: {
        storeId: "405ea1a3-a053-4f0f-a9a3-bbc065ab7cf3",
        ...(type !== "all" && date.start && date.end
          ? {
              created_at: {
                gte: date.start,
                lte: date.end,
              },
            }
          : {}),
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
    return {
      status: 200,
      message: "",
      items: result.map((item) => ({
        ...item,
        name: item.display_id,
        phone: item.phone || "",
      })),
    };
  } catch (error) {
    console.log("[error]", error);
  }
}

export type GetListRegisterResponse = Prisma.PromiseReturnType<
  typeof getListRegister
>;

export type RegisteredItem =
  NonNullable<GetListRegisterResponse>["items"][number];

export async function getRegisterById(id: string) {
  if (!id) {
    return { status: 401, items: [] };
  }
  const result = await db.receive.findUnique({
    where: {
      id,
    },
    include: {
      comments: {
        select: { id: true },
      },
    },
  });

  return {
    status: 200,
    message: "완료",
    item: result,
  };
}

export type GetRegisterByIdResponse = Prisma.PromiseReturnType<
  typeof getRegisterById
>;

// Response에서 item이 null이 아닌 실제 데이터 타입만 추출
export type ReceiveDetail = NonNullable<GetRegisterByIdResponse["item"]>;

export async function updateReceiptAction(
  prevState: unknown,
  formData: FormData
) {
  // 1. FormData를 객체로 변환
  const rawData = Object.fromEntries(formData.entries());
  console.log("rawData", rawData);

  // 2. 서버 사이드 Zod 검증 (보안 필수!)
  const validatedFields = updateReceiptSchema.safeParse({
    ...rawData,
    // price: Number(rawData.price), // 문자열을 숫자로 변환
  });
  console.log("validatedFields", validatedFields);
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. DB 로직 수행 (예: Prisma)
  // await db.receipt.update(...)

  return { success: true, message: "수정이 완료되었습니다." };
}
