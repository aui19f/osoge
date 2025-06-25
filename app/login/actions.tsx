"use server";

import { EnumRole } from "@/lib/constants/roles";
import db from "@/lib/db";
import getSession from "@/lib/sesstion";
import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default async function LoginForm(prev: unknown, formData: FormData) {
  const inputData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(inputData);

  if (!result.success) {
    return result.error.flatten();
  }

  const { data: loginData, error: loginError } =
    await supabase.auth.signInWithPassword({
      email: result.data.email,
      password: result.data.password,
    });

  if (loginError) {
    console.log("에러발생", loginError);
    return {
      code: 400,
      message: "에러발생",
      fieldErrors: { email: [], password: [] },
    };
  }

  const user = loginData.user;
  console.log("[loginData]", loginData.user); // 로그인한 사용자 정보 (id, email 등)

  // 디비조회
  const userInDb = await db.users.findUniqueOrThrow({
    where: { id: user.id }, // Supabase 유저 ID로 조회
  });

  if (!userInDb) {
    return {
      code: 400,
      message: "User data not found in local DB",
      fieldErrors: { email: [], password: [] },
    };
    // throw new Error("User data not found in local DB");
  }

  // //사용자 정보를 세션에 저장
  const session = await getSession();
  session.id = userInDb!.id;
  session.role = userInDb.role as EnumRole;
  await session.save();

  if (session.role === EnumRole.MASTER) {
    redirect("/master");
  } else {
  }
}
