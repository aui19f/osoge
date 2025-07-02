import { NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest) {
  console.log("=====function middleware()=====");
  //쿠키가져오기
  const cookie = request.cookies.get("osoge");
  if (!cookie) {
    console.log("쿠키정보없음");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// middleware.ts 마지막에 추가
export const config = {
  matcher: [
    "/((?!login|_next|favicon.ico).*)", // ✅ login 제외
  ],
};
