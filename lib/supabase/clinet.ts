import { createClient } from "@supabase/supabase-js";
/**
 * createBrowserClient (클라이언트용)
  use client 지시어가 포함된 클라이언트 컴포넌트에서 사용
  
  작동 방식
  브라우저의 전역 객체인 window와 document.cookie에 접근하여 쿠키를 직접 다룸
  사용자가 로그인하면 Supabase Client SDK가 쿠키를 자동으로 브라우저에 저장하고, 
    이후의 모든 API 요청에 이 쿠키를 자동으로 포함시킵니다.
  
  - 브라우저 종속성: window 객체에 접근하기 때문에, 서버에서는 실행될 수 없음
  - 싱글톤 패턴: 일반적으로 애플리케이션당 하나의 인스턴스만 생성되어 효율
  - 자동 처리: 로그인 성공 후 리디렉션, 토큰 갱신 등 세션 관련 작업을 자동으로 처리
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 환경 변수가 없을 경우 오류를 명확히 띄우는 것이 좋습니다.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
