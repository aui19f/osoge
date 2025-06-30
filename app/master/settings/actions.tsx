"use server";

import getSession from "@/lib/sesstion";
import { supabase } from "@/lib/supabaseClient";
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
