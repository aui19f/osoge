// middleware.ts

import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  // 공개 경로 체크 (인증 불필요)
  const publicPaths = ["/", "/apply"];
  if (publicPaths.includes(pathname)) {
    return response;
  }

  // 세션 쿠키 읽기
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const role = user?.role;

  if (pathname === "/login") {
    if (user) {
      if (role === "MASTER") {
        return NextResponse.redirect(new URL("/master", request.url));
      } else if (role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", request.url));
      } else if (role === "GUEST") {
        return NextResponse.redirect(new URL("/guest", request.url));
      }
    }
    return response;
  }

  const roleBasedPaths = [
    { prefix: "/master", requiredRole: "MASTER" },
    { prefix: "/admin", requiredRole: "ADMIN" },
    { prefix: "/guest", requiredRole: "GUEST" },
  ];

  for (const { prefix, requiredRole } of roleBasedPaths) {
    if (pathname.startsWith(prefix)) {
      if (role !== requiredRole) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      break;
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
