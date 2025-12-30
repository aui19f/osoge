"use server";
import * as Sentry from "@sentry/nextjs";
import db from "@/lib/db";
import { loginSchema } from "@/schemas/auth";
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
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: result.data.email,
        password: result.data.password,
      });

    if (authError || !authData.session || !authData.user) {
      throw new Error(
        "⚠️ 'signInWithPassword' 해당 사용자 정보를 찾을 수 없습니다."
      );
    }
    //3. 디비

    const user = await db.users.findUnique({
      where: { id: authData.user.id }, // Supabase 유저 ID로 조회
    });

    if (!user) {
      await supabase.auth.signOut();
      throw new Error("⚠️ Supabase에는 있지만 DB에 없는 경우");
    }

    //4. 완료
    return {
      status: 200,
      message: "",
      data: {
        user,
        sesstion: {
          access_token: authData.session.access_token,
          refresh_token: authData.session.refresh_token,
          expires_at: authData.session.expires_at || 0,
          expires_in: authData.session.expires_in || 0,
          token_type: authData.session.token_type || "bearer",
          user: authData.session.user,
        },
      },
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
      message: "아이디와 비밀번호를 체크해주세요.",
    };
  }
}
