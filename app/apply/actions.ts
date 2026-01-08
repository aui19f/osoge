"use server";
import db from "@/lib/db";
import { applySchema } from "@/schemas/apply";
import { logError } from "@/utils/logger";

export default async function createApply(prev: unknown, formData: FormData) {
  // 빈 문자열이면 null을 반환하여 DB 무결성 유지
  const toNullable = (key: string) => {
    const val = formData.get(key);
    return val === "" || val === null ? null : String(val);
  };

  const inputData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    company: toNullable("company"),
    biz_num: toNullable("biz_num"),
    biz_num_status: toNullable("biz_num_status"),
    memo: toNullable("memo"),
  };

  try {
    const result = await applySchema.safeParseAsync(inputData);
    if (!result.success) {
      throw "이름, 핸드폰 번호를 확인해주세요.";
    }

    await db.apply.create({
      data: {
        name: result.data.name,
        phone: result.data.phone,
        biz_name: result.data.company,
        memo: result.data.memo || "",
        biz_num: result.data.biz_num,
        biz_num_status: result.data.biz_num_status,
      },
    });

    return {
      status: 200,
      message: "접수가 완료되었습니다.",
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
