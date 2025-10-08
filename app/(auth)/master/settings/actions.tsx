"use server";

import getSession from "@/lib/sesstion";
import { supabase } from "@/lib/supabaseClient";

import { redirect } from "next/navigation";
import { z } from "zod";
import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getUser } from "@/app/actions/getUser";
const passwordSchema = z.object({
  beforePw: z.string().min(1, "현재 비밀번호를 입력해주세요."),
  newPw: z.string().min(1, "새 비밀번호를 입력해주세요."),
  checkPw: z.string().min(1, "비밀번호 확인을 입력해주세요."),
});

export async function userLogin() {
  // supabase
  const { error } = await supabase.auth.signOut();
  console.log(error);
  //sesstion
  const session = await getSession();
  await session.destroy();

  redirect("/login");
}

export const updatePassword = async (
  prevState: unknown,
  formData: FormData
) => {
  const data = {
    beforePw: formData.get("beforePw"),
    newPw: formData.get("newPw"),
    checkPw: formData.get("checkPw"),
  };

  const result = await passwordSchema.safeParseAsync(data);

  if (!result.success) {
    return {
      code: 400,
      message: "에러발생",
      fieldErrors: result.error.flatten(),
    };
  }
  const supabase = createServerActionClient({ cookies });

  const user = await getUser();
  if (!user || !user.email) {
    return { success: false, message: "로그인 정보를 확인할 수 없습니다." };
  }
  //1. 비밀번호가 맞는지 확인
  const { error } = await supabase.auth.signInWithPassword({
    email: user?.email as string,
    password: data.beforePw as string,
  });
  console.log("error", error);
  if (error) {
    return { success: false, message: "현재 비밀번호를 확인해주십시오." };
  }
};
// tnwl@8589
