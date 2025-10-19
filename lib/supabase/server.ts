import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
/**
 *  createServerClient (서버용)
    서버 컴포넌트, 서버 액션, API 라우트, 미들웨어 등 서버 환경에서 사용

    작동 방식
      | Next.js가 제공하는 cookies() 함수를 통해 요청에 포함된 쿠키를 읽고 사용
      | 브라우저에서 서버로 요청이 올 때, Supabase 세션 정보가 담긴 쿠키가 함께 전달되는데, 
        createServerClient는 이 쿠키를 사용하여 사용자를 인증
    
    - 쿠키 종속성: Next.js의 cookies() 함수에 의존. 
      이 함수는 서버 환경에서만 사용 가능하므로, createServerClient도 서버 전용 함수가 됨
    - 세션 관리: 서버 측에서 Supabase API를 호출할 때 쿠키를 자동으로 처리하여 
      현재 사용자의 세션을 유지해줍니다.
    - 보안: 서버에서 실행되므로 API 키와 같은 민감한 정보가 클라이언트에 노출될 염려가 없음
 */

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        ...cookieStore,
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
