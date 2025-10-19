import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 로그인 페이지에 접근했는데 이미 로그인된 경우
  if (req.nextUrl.pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/master/:path*", "/login"],
};
