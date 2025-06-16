"use server";
import db from "@/lib/db";
import { supabase } from "@/lib/supabaseClient";
import { z } from "zod";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export async function createAccount(prevState: any, formData: FormData) {
  console.log(">>>>", formData);
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  }

  const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });
  if (signUpErr) {
    throw signUpErr;
  }

  console.log("signUpData", signUpData.user);
  const { id } = signUpData.user;
  console.log("[ID확인] ", id);
  await db.users.create({
    data: {
      id,
      email: data.email,
    },
    select: {
      id: true,
    },
  });
  console.log("완료?");
}
