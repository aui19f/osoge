"use server";
import db from "@/lib/db";
import { signupSchema } from "@/schemas/auth";
import { createClient } from "@/lib/supabase/server";

import { EnumRole, EnumUserStatus } from "@prisma/client";
import * as Sentry from "@sentry/nextjs";

export async function CreateAccountForm(prev: unknown, formData: FormData) {
  try {
    const supabase = await createClient();
    const inputData = {
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("password_check"),
    };
    //1. 유효성검사
    const result = await signupSchema.safeParseAsync(inputData);
    if (!result.success) {
      return {
        status: 401,
        message: "아이디 비밀번호를 확인해주세요.",
      };
    }
    //2. 인증 - 가입유무확인
    const { data, error } = await supabase.auth.signUp({
      email: result.data.email,
      password: result.data.password,
    });

    if (error !== null) {
      return { success: false, error: "이메일, 비밀번호를 확인해주세요." };
    }
    const { user } = data;

    //3. 디비저장
    //플랜
    let plan = null;
    plan = await db.plan.findUnique({
      where: { name: "BASICS" },
    });

    if (!plan) {
      plan = await db.plan.create({
        data: {
          name: "BASICS",
          print: true,
          register: false,
          send_message: false,
        },
      });
      Sentry.captureException(error, {
        tags: { module: "create-aacount" },
        extra: {
          formData: { email: formData.get("email") },
          message: "회원가입 중 오류 발생 -- plan 속성이 없음 (우선 생성함)",
        },
      });
    }

    // 4. 디비 저장
    await db.users.create({
      data: {
        id: user!.id,
        email: result.data.email,
        nickname: result.data.email.split("@")[0],
        role: EnumRole.GUEST,
        status: EnumUserStatus.JOIN,
        planId: plan?.id,
      },
    });

    // 5. 완료 (로그인페이지이동)
    return {
      status: 200,
      message: "회원가입이 완료되었습니다.",
    };
  } catch (error) {
    Sentry.captureException(error, {
      tags: { module: "create-aacount" },
      extra: {
        formData: { email: formData.get("email") },
        message: "회원가입 중 오류 발생",
        systemErr: error,
      },
    });
    return {
      status: 401,
      message:
        "회원가입 중 문제가 생겼습니다. 문의글을 남겨주시면 빠르게 해결하겠습니다.",
    };
  }
}
