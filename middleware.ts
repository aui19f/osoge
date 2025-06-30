import { NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest) {
  // console.log("=====function middleware()=====");
  // //쿠키가져오기
  // const cookie = request.cookies.get("osoge");
  // if (!cookie) {
  //   console.log("쿠키정보없음");
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  // //쿠키값 확인
  // const decoded = JSON.parse(decodeURIComponent(cookie.value));
  // if (!decoded?.id || !decoded?.role) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  // console.log(">>>> ", decoded.id, decoded.role);
}
