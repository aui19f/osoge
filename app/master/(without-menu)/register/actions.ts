"use server";
import db from "@/lib/db";
// import db from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import { registerSchema } from "@/schemas/register";
import dayjs from "dayjs";

// const cache = new Map<string, number>(); // 임시 메모리 캐시

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

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw "user 데이터가 없습니다.";

    const { storeIds } = user?.app_metadata;

    if (storeIds.length === 0) throw "관리중인 매장이 없습니다.";
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
