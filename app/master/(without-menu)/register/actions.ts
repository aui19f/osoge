"use server";
import { getUser } from "@/app/actions/getUser";
import db from "@/lib/db";
import { registerSchema } from "@/schemas/register";

export async function registerForm(prev: unknown, formData: FormData) {
  try {
    //1. 입력데이터 확인
    const isAgree = Boolean(formData.get("agree") === "agree");
    const inputData = {
      phone: formData.get("phone"),
      isAgree,
    };
    const result = registerSchema.safeParse(inputData);
    if (!result.success) {
      return {
        status: 401,
        message: "핸드폰번호를 확인해주세요.",
      };
    }

    const { storeIds } = await getUser();
    if (storeIds.length === 0) throw new Error("관리중인 매장이 없습니다.");

    //디비저장
    const createReceive = await db.receive.create({
      data: {
        phone: isAgree ? result?.data?.phone : null,
        storeId: storeIds[0],
      },
    });

    return {
      status: 200,
      message: "접수가 완료되었습니다.",
      data: createReceive,
    };
  } catch (error) {
    return {
      status: 401,
      message: "접수가 되지 않았습니다.",
      error: error,
    };
  }
}
