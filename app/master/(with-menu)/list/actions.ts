"use server";

// import { getUser } from "@/app/actions/getUser";

import { updateReceiptSchema } from "@/schemas/register";
import { SearchBarInput, searchBarSchema } from "@/schemas/search";
import { logError } from "@/utils/logger";
import * as RegisterDB from "@/app/actions/register";
// import { ensureAuth } from "@/app/actions/auth";

export async function getListRegister(params: SearchBarInput) {
  try {
    // 1. 검증 (실패 시 에러 Throw)
    const validatedParams = await searchBarSchema.parseAsync(params);
    const { type, date, status, sort, word } = validatedParams;
    const created_at =
      type === "all"
        ? undefined
        : {
            get: date.start,
            lte: date.end,
          };

    // const { storeIds } = await getUser();
    // if (storeIds.length === 0) throw new Error("관리중인 매장이 없습니다.");
    // const {
    //   user: {
    //     app_metadata: { storeIds },
    //   },
    // } = await ensureAuth();

    // if (storeIds[0].length === 0) throw new Error("관리중인 매장이 없습니다.");

    const items = await RegisterDB.selectListRegister({
      id: "9e97b969-ff73-4f5d-89e7-b357a38e5da2",
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
        name: item.display_id,
        phone: item.phone || "",
      })),
    };
  } catch (error) {
    console.log("[error]", error);
  }
}

export async function getRegisterById(id: string) {
  if (!id) {
    return { status: 401, message: "아이디를 확인해주세요.", items: null };
  }
  try {
    return {
      status: 200,
      message: "완료",
      items: RegisterDB.selectRegisterById(id),
    };
  } catch (error) {
    logError(error, {
      module: "Item Details",
      message: "아이템 디테일 에러",
      extra: {
        formData: { id },
        systemErr: error,
      },
    });
  }
}

export async function setRegister(prevState: unknown, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());

  try {
    const validatedFields = updateReceiptSchema.safeParse({
      ...rawData,
    });

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    if (validatedFields.data.saveType === "send") {
      console.log("전송");
    }
    // 디비 업데이트
    await RegisterDB.updateRegister({
      ...validatedFields.data,
    });

    return {
      status: 200,
      message:
        validatedFields.data.saveType === "send" ? "전송되었습니다." : "",
    };
  } catch (error) {
    logError(error, {
      module: "Item Detail Update",
      message: "접수 수정 중 에러 발생",
      extra: {
        formData: { ...rawData },
        systemErr: error,
      },
    });

    return {
      status: 401,
      message: "수정중 에러가 발생했습니다.",
      error,
    };
  }
}
