"use server";

import { loginSchema } from "@/schemas/auth";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { logError } from "@/utils/logger";
import { isExpectedError } from "@/utils/error";

export default async function loginAction(prev: unknown, formData: FormData) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const inputData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  let userRole = "";
  try {
    const result = await loginSchema.safeParseAsync(inputData);
    if (!result.success) {
      throw "이메일, 비빌번호를 확인해주세요.";
    }

    const { email, password } = result.data;
    const supabase = await createClient();
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    // 에러 필터링 -- 아이디/비번 오타 등
    if (authError) {
      if (isExpectedError(authError)) {
        return { status: 401, message: "아이디 또는 비밀번호가 틀렸습니다." };
      }
      throw authError; // 예상치 못한 에러(DB 장애 등)만 catch로 던짐
    }

    if (!authData.session || !authData.user) {
      throw new Error("세션 생성 실패");
    }

    userRole = authData?.user?.app_metadata?.role?.toUpperCase() || "";
  } catch (error) {
    logError(error, {
      module: "Login",
      message: "",
      extra: {
        formData: { ...inputData },
        systemErr: error,
      },
    });

    return {
      status: 401,
      message: "아이디와 비밀번호를 체크해주세요.",
      error,
    };
  }
  redirect(`/${userRole.toLowerCase()}`);
}
