"use server";
import * as Sentry from "@sentry/nextjs";
import db from "@/lib/db";
import { loginSchema } from "@/lib/schemas/auth";
import { createClient } from "@/lib/supabase/server";

export default async function LoginForm(prev: unknown, formData: FormData) {
  try {
    const supabase = await createClient();
    //1. 유효성확인
    const inputData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const result = await loginSchema.safeParseAsync(inputData);

    if (!result.success) {
      return {
        status: 401,
        message: "아이디 비밀번호를 확인해주세요.",
      };
    }

    //2. 인증
    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email: result.data.email,
        password: result.data.password,
      });

    if (loginError) {
      //Email not confirmed at async LoginForm
      return {
        status: 401,
        message: "아이디 비밀번호를 확인해주세요.",
      };
    }
    //3. 디비
    const user = loginData.user;
    const userDB = await db.users.findUnique({
      where: { id: user.id }, // Supabase 유저 ID로 조회
    });

    if (!userDB) {
      return {
        status: 401,
        message: "아이디 비밀번호를 확인해주세요.",
      };
    }

    //4. 완료
    return {
      status: 200,
      message: "",
      data: userDB,
    };
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
      message:
        "로그인 중 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}
