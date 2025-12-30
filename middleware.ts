// middleware.ts
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (process.env.NODE_ENV === "development") {
    console.log("Middleware called for:", request.nextUrl.pathname);
  }
  // 1. 공개 경로(Public)는 인증 로직 실행 전 즉시 반환
  const publicPaths = ["/", "/apply"];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // ✅ 2. Prefetch 요청 체크 (추가된 부분)
  // Next.js가 미리 데이터를 가져올 때는 무거운 인증 로직을 실행하지 않고 통과시킵니다.
  const isPrefetch = request.headers.get("x-middleware-prefetch");
  if (isPrefetch) {
    return NextResponse.next();
  }

  console.log("=====middleware========");
  // 2. Supabase 클라이언트 생성 (서버 측)
  const supabase = await createClient();

  // 3. getUser 호출 (여기서 딱 한 번만 수행)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // // 로그인 안 된 상태에서 보호된 경로 접근 시
  if (!user && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 로그인 된 유저가 /login 접속 시 대시보드로 리다이렉트
  if (pathname === "/login" && user) {
    const role = user.app_metadata?.role?.toUpperCase();
    return NextResponse.redirect(
      new URL(`/${role?.toLowerCase() || ""}`, request.url)
    );
  }

  // 4. 권한(Role) 체크 로직
  const userRole = user?.app_metadata?.role?.toUpperCase() || "";
  if (process.env.NODE_ENV === "development") {
    console.log("[[userRole]]", userRole);
  }

  const roleBasedPaths = [
    { prefix: "/master", requiredRole: "MASTER" },
    { prefix: "/admin", requiredRole: "ADMIN" },
    { prefix: "/guest", requiredRole: "GUEST" },
  ];

  for (const { prefix, requiredRole } of roleBasedPaths) {
    if (pathname.startsWith(prefix)) {
      if (userRole !== requiredRole) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      break;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 아래의 경로들을 제외한 모든 경로에 미들웨어 적용:
     * 1. api/ : API 라우트
     * 2. monitoring : Sentry 등 모니터링 툴
     * 3. _next/static, _next/image : 넥스트 정적 자원 및 이미지 최적화
     * 4. favicon.ico, manifest.json : PWA 및 웹 아이콘 파일 ✅
     * 5. .*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$ : 모든 이미지 확장자 ✅
     */
    "/((?!api/|monitoring|_next/static|_next/image|favicon.ico|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
