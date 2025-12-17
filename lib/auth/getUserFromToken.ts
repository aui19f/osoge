// lib/auth/get-user-from-token.ts
import { createClient } from "@/lib/supabase/server";
import { EnumRole, EnumUserStatus } from "@prisma/client";

export type UserFromToken = {
  id: string;
  email: string;
  role: "GUEST" | "ADMIN" | "MASTER";
  status: "JOIN" | "WITHDRAW";
  planId: string | null;
} | null;

/**
 * JWT 토큰에서 사용자 정보 추출 (DB 호출 0회)
 * Supabase의 getUser()는 JWT 검증만 수행하고 DB 조회 안함
 */
export async function getUserFromToken(): Promise<UserFromToken> {
  const supabase = await createClient();

  // JWT 토큰 검증 (네트워크 호출 없음, 로컬 검증)
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.log("❌ No valid JWT token");
    return null;
  }

  // JWT의 app_metadata에서 role 추출
  const role = user.app_metadata?.role as EnumRole;
  const status = user.app_metadata?.status as EnumUserStatus;
  const planId = user.app_metadata?.planId as string | undefined;

  console.log("✅ User from JWT:", {
    id: user.id,
    role,
  });

  return {
    id: user.id,
    email: user.email!,
    role: role || "GUEST",
    status: status || "JOIN",
    planId: planId || null,
  };
}
