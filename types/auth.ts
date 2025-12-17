// src/types/auth.ts

// src/types/auth.ts
import type { User as SupabaseUser } from "@supabase/supabase-js";

import { typeDBUsers } from "@/app/api/users/route";
import { EnumRole } from "@prisma/client";

//Supabase 세션 정보 (필요한 필드만)
export interface SessionData {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  expires_in: number;
  token_type: string;
  user: SupabaseUser;
}

/**
 * 인증 상태 타입
 */

export interface AuthState {
  isAuthenticated: boolean;
  user: typeDBUsers | null;
  session: SessionData | null;
}

//역할별 리다이렉트 경로
export const ROLE_REDIRECT_MAP: Record<EnumRole, string> = {
  MASTER: "/master",
  ADMIN: "/admin",
  GUEST: "/guest",
} as const;

//공개 경로 (인증 불필요)
export const PUBLIC_ROUTES = ["/", "/login"] as const;

//역할별 접근 가능한 경로 패턴
export const ROLE_ACCESS_MAP: Record<EnumRole, RegExp[]> = {
  MASTER: [/^\/master.*/, /^\/admin.*/, /^\/guest.*/],
  ADMIN: [/^\/admin.*/, /^\/guest.*/],
  GUEST: [/^\/guest.*/],
};
