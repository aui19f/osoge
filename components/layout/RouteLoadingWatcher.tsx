// components/RouteLoadingWatcher.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLoadingStore } from "@/store/useLoading";
import Loading from "@/components/layout/Loading";

export default function RouteLoadingWatcher() {
  const pathname = usePathname();
  const { isLoading, setLoading } = useLoadingStore();

  // 페이지 이동 후 렌더링 완료 시 로딩 종료
  useEffect(() => {
    setLoading(false);
  }, [pathname, setLoading]);

  return <>{isLoading ? <Loading /> : null}</>;
}
