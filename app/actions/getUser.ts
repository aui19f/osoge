"use server";

import { createClient } from "@/lib/supabase/server";

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("user 데이터가 없습니다.");

  const { storeIds = [], role } = user.app_metadata;

  return { storeIds, role, supabase };
}
