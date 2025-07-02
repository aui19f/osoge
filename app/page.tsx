// "use client";
// import { userLogin } from "@/app/master/settings/actions";
// import { useEffect } from "react";

import getSession from "@/lib/sesstion";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getSession();

  // if (session?.id) {
  // ✅ 이미 로그인한 사용자면 홈으로 리디렉트
  // redirect("/");
  // }

  if (session.role === "MASTER") {
    redirect("/master");
  }

  if (session.role === "ADMIN") {
    redirect("/admin");
  }

  return <p>처리 중입니다...</p>;
}
