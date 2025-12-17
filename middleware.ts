// middleware.ts

import { getUserFromToken } from "@/lib/auth/getUserFromToken";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  // 1. 공개 경로 체크 (인증 불필요)
  const publicPaths = ["/", "/apply"];
  if (publicPaths.includes(pathname)) {
    return response;
  }

  // 2. 세션 확인 (1회 호출)
  const user = await getUserFromToken(); // DB 호출 0회
  console.log("user", user);

  if (pathname === "/login") {
    if (user) {
      if (user?.role === "MASTER") {
        return NextResponse.redirect(new URL("/master", request.url));
      } else if (user?.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", request.url));
      } else if (user?.role === "GUEST") {
        return NextResponse.redirect(new URL("/guest", request.url));
      }
    }
    return response;
  }
  // // 3. /login 경로 처리
  // if (pathname === "/login") {
  //   // 로그인 상태라면 role에 따라 리다이렉트
  //   if (user) {
  //     if (user?.role === "MASTER") {
  //       return NextResponse.redirect(new URL("/master", request.url));
  //     } else if (user?.role === "ADMIN") {
  //       return NextResponse.redirect(new URL("/admin", request.url));
  //     } else if (user?.role === "GUEST") {
  //       return NextResponse.redirect(new URL("/guest", request.url));
  //     }
  //   }
  //   return response;
  // }

  // // 4. 보호된 경로 접근 시 인증 체크
  // if (!user) {
  //   console.log("보호된 경로 접근 시 인증 체크");
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // // 5. Role 기반 경로 접근 제어
  // // /master, /admin, /guest로 시작하는 경로 체크
  const roleBasedPaths = [
    { prefix: "/master", requiredRole: "MASTER" },
    { prefix: "/admin", requiredRole: "ADMIN" },
    { prefix: "/guest", requiredRole: "GUEST" },
  ];

  for (const { prefix, requiredRole } of roleBasedPaths) {
    if (pathname.startsWith(prefix)) {
      // role이 일치하지 않으면 홈으로 리다이렉트
      if (user?.role !== requiredRole) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      break; // 매칭되면 더 이상 체크하지 않음
    }
  }

  return response;
}

/**
 * 미들웨어가 실행될 경로 지정
 * API 라우트와 정적 파일은 제외
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes)
     */
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
