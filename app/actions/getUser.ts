import { EnumNextPlan } from "@/lib/constants/plan";
import { EnumRole } from "@/lib/constants/roles";
import { EnumNextStatus } from "@/lib/constants/status";
import db from "@/lib/db";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const createServerSupabaseClient = () =>
  createServerComponentClient({ cookies });

export async function getUser() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  try {
    const userDB = await db.users.findUnique({
      where: { id: user.id },
    });

    if (!userDB) return null;
    return {
      ...userDB,
      status: userDB.status as EnumNextStatus,
      role: userDB.role as EnumRole,
      plan: userDB.plan as EnumNextPlan,
    };
  } catch (error) {
    throw new Error("No user information.", { cause: error });
  }
}
