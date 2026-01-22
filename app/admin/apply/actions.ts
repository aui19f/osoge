"use server";

import { SearchBarInput, searchBarSchema } from "@/schemas/search";
import * as ApplyDb from "@/app/actions/apply";
import { logError } from "@/utils/logger";
import { applyHistorySchema } from "@/schemas/apply";
import { revalidatePath } from "next/cache";

export async function getListApply(params: SearchBarInput) {
  const validatedParams = await searchBarSchema.parseAsync(params);
  const { type, date, status, sort, word } = validatedParams;

  try {
    const created_at =
      type === "all"
        ? undefined
        : {
            get: date.start,
            lte: date.end,
          };
    const items = await ApplyDb.selectListApply({
      status,
      sort,
      word,
      created_at,
    });

    return {
      status: 200,
      message: "",
      items: items.map((item) => ({
        ...item,
        count: item._count.apply_histories,
      })),
    };
  } catch (error) {
    logError(error, {
      module: "Apply List ",
      message: "Apply 리스트 조회 에러 (app/admin/apply)",
      extra: {
        formData: {},
        systemErr: error,
      },
    });
    return {
      status: 401,
      message: "내역 조회 중 에러가 발생하였습니다.",
    };
  }
}

export async function getApplyById(id: string) {
  if (!id) {
    return { status: 401, message: "아이디를 확인해주세요.", items: null };
  }
  try {
    const item = await ApplyDb.selectApplyById(id);
    return {
      status: 200,
      message: "",
      item,
    };
  } catch (error) {
    logError(error, {
      module: "Apply Details",
      message: "Apply 개별 조회 에러 (app/admin/apply)",
      extra: {
        formData: { id },
        systemErr: error,
      },
    });
    return {
      status: 401,
      message: "데이터를 조회할수없습니다.",
    };
  }
}

export async function setApplyHistory(prevState: unknown, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  try {
    const validateFields = await applyHistorySchema.parseAsync(rawData);

    // 수정
    await ApplyDb.updateApply(validateFields.id, validateFields.status);

    // 로그 생성
    const items = await ApplyDb.insertApplyHistory(validateFields);

    revalidatePath("/admin/apply");
    return {
      status: 200,
      message: "저장되었습니다.",
      items,
    };
  } catch (error) {
    logError(error, {
      module: "app/admin/apply/actions.ts (setApplyHistory)",
      message: "로그 데이터 입력 중 에러 발생",
      extra: {
        formData: { ...rawData },
        systemErr: error,
      },
    });
    return {
      status: 401,
      message: "로그 데이터 입력 중 에러가 발생",
    };
  }
}
