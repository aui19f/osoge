"use server";

import db from "@/lib/db";
import { registerSchema } from "@/schemas/register";
import { logError } from "@/utils/logger";

export async function createRegister(prev: unknown, formData: FormData) {
  // 1. 입력데이터 확인
  const isAgree = formData.get("agree") === "agree";
  const inputData = {
    phone: formData.get("phone"),
    agree: isAgree ? ["agree"] : [],
    storeId: formData.get("storeId"),
  };

  try {
    const result = registerSchema.safeParse(inputData);
    if (!result.success) {
      throw "입력데이터를 확인해주세요.";
    }

    //2. 매장 조회 (다시 조회할건지 아직 고민중)
    //3. 디비저장
    const createRegister = await db.receive.create({
      data: {
        phone: isAgree ? result?.data?.phone : null,
        storeId: result.data.storeId,
      },
    });
    return {
      status: 200,
      message: "접수가 완료되었습니다.",
      items: createRegister,
    };
  } catch (error) {
    logError(error, {
      module: "Register",
      message: "",
      extra: {
        formData: { ...inputData },
        systemErr: error,
      },
    });

    return {
      status: 401,
      message: "입력데이터를 확인해주세요?",
      error,
    };
  }
}
