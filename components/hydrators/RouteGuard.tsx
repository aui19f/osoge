// components/RouteGuard.tsx
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

export default function RouteGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUserStore();

  useEffect(() => {
    if (!user) return;

    // 권한별 접근 제한 로직

    // 예: USER는 /reception 접근 불가
    if (user.role === "ADMIN" && pathname.startsWith("/master")) {
      alert("접근 권한이 없습니다.1");
    }

    // 예: MASTER는 /userpage 접근 불가
    if (user.role === "MASTER" && pathname.startsWith("/admin")) {
      alert("접근 권한이 없습니다.2");
    }
  }, [pathname, user, router]);

  return null;
}
