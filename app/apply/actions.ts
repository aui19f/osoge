"use server";

import { applySchema } from "@/schemas/apply";
import { logError } from "@/utils/logger";

import * as ApplyDb from "@/app/actions/apply";
export async function createApply(prev: unknown, formData: FormData) {
  const inputData = Object.fromEntries(formData);

  try {
    const result = await applySchema.safeParseAsync(inputData);
    if (!result.success) {
      throw "이름, 핸드폰 번호를 확인해주세요.";
    }
    return {
      status: 200,
      message: "접수가 완료되었습니다.",
      item: await ApplyDb.createApply(result.data),
    };
  } catch (error) {
    logError(error, {
      module: "Apply",
      message: "문의글 작성 중 오류 발생",
      extra: {
        formData: { ...inputData },
        systemErr: error,
      },
    });

    return {
      status: 401,
      message: "일시적인 문제가 생겼습니다. 다시 시도해주시기 바랍니다.",
      error,
    };
  }
}
