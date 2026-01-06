"use server";
import * as Sentry from "@sentry/nextjs";
import { loginSchema } from "@/schemas/auth";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function loginAction(prev: unknown, formData: FormData) {
  const inputData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

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

    const userRole = authData?.user?.app_metadata?.role?.toUpperCase() || "";
    redirect(`/${userRole}`);

    //4. 완료
    // return {
    //   status: 200,
    //   message: "",
    // };
  } catch (error) {
    Sentry.captureException(error, {
      tags: { module: "login" },
      extra: {
        formData: { email: formData.get("email") },
        message: "로그인 중 중 오류 발생",
        systemErr: error,
      },
    });

    return {
      status: 401,
      message: "아이디와 비밀번호를 체크해주세요.",
    };
  }
}
