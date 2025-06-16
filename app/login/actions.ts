"use server";

import { z } from "zod";
import { supabase } from "@/lib/supabaseClient";
import db from "@/lib/db";
import getSession from "@/lib/sesstion";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});
export default async function LoginForm(prevState: any, formData: FormData) {
  console.log(">>>>", formData);
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  }

  const { data: loginData, error: loginError } =
    await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

  if (loginError) {
    //throw loginError;
    console.log("에러발생", loginError);
    return false;
  }

  const user = loginData.user;
  console.log("[loginData]", loginData.user); // 로그인한 사용자 정보 (id, email 등)

  // 디비조회
  const userInDb = await db.users.findUniqueOrThrow({
    where: { id: user.id }, // Supabase 유저 ID로 조회
  });
  console.log("userInDb", userInDb);
  if (!userInDb) {
    throw new Error("User data not found in local DB");
  }

  // //사용자 정보를 세션에 저장
  const session = await getSession();
  session.id = userInDb!.id;
  session.role = userInDb.role;
  await session.save();
}
