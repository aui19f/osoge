// app/actions/auth.ts
"use server";

import db from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

/**
 * 서버 액션 전용 인증 체크 함수
 * 인증되지 않은 경우 에러를 던져 이후 로직 실행을 차단합니다.
 */
export async function ensureAuth() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    // 클라이언트의 try-catch나 useFormStatus에서 잡을 수 있도록 에러 발생
    throw new Error("인증이 필요합니다. 다시 로그인해주세요.");
  }

  return { user, supabase };
}

/**
 * 유저가 특정 권한(예: 스토어 소유자)을 가지고 있는지 추가 검증이 필요할 때
 */
export async function ensureStoreAuth(storeId?: string) {
  const { user, supabase } = await ensureAuth();

  // 예: 자신의 스토어 데이터만 수정 가능한지 확인
  // storeId가 넘어왔을 경우 user.id와 비교하는 로직 등을 추가할 수 있습니다.
  if (storeId && user.id !== storeId) {
    throw new Error("해당 데이터에 대한 접근 권한이 없습니다.");
  }

  return { user, supabase };
}
