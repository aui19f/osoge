"use server";

import { loginSchema } from "@/schemas/auth";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { logError } from "@/utils/logger";

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

    if (authError || !authData.session || !authData.user) {
      throw new Error(
        "⚠️ 'signInWithPassword' 해당 사용자 정보를 찾을 수 없습니다."
      );
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
