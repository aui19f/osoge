"use server";
import * as Sentry from "@sentry/nextjs";
import db from "@/lib/db";
import { applySchema } from "@/lib/schemas/apply";

export default async function ApplyForm(prev: unknown, formData: FormData) {
  const inputData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    company: formData.get("company"),
    biz_num: formData.get("biz_num"),
    biz_num_status: formData.get("biz_num_status"),

    memo: formData.get("memo"),
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
        store: result.data.company,
        biz_num: result.data.biz_num,
        biz_num_status: result.data.biz_num_status,
        address: result.data.company,
        memo: result.data.memo,
      },
    });

    return {
      status: 200,
      message: "접수가 완료되었습니다.",
    };
    //디비저장
  } catch (error) {
    Sentry.captureException(error, {
      tags: { module: "Apply" },
      extra: {
        formData: { ...inputData },
        message: "문의글 작성 중 오류 발생",
        systemErr: error,
      },
    });

    return {
      status: 401,
      message:
        error || "일시적인 문제가 생겼습니다. 다시 시도해주시기 바랍니다.",
    };
  }
}
