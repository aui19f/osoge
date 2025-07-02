"use server";

import getSession from "@/lib/sesstion";
import { supabase } from "@/lib/supabaseClient";
import { fetchUserById } from "@/lib/user";
import { redirect } from "next/navigation";

export async function userLogin() {
  // supabase
  const { error } = await supabase.auth.signOut();
  console.log("supabase: ", error);

  //sesstion
  const session = await getSession();
  await session.destroy();

  redirect("/login");
}

export async function userInfo() {
  const session = await getSession();
  // 세션 ID가 없을 경우를 대비하여 에러 처리를 추가하는 것이 좋습니다.
  if (!session || !session.id) {
    throw new Error("User session not found or ID missing.");
  }
  return await fetchUserById(session.id);
}
