"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * 이 로직은 사용자가 뒤로가기를 누를 때마다 다시 현재 URL을 히스토리에 밀어넣어(Push), 
 * 결과적으로 페이지가 이동되지 못함
 */
export default function PreventBackHandler() {
  const pathname = usePathname();

  useEffect(() => {
    window.history.pushState(null, "", pathname);

    const handlePopState = () => {
      window.history.pushState(null, "", pathname);
      // alert("접수 중에는 뒤로 갈 수 없습니다. 화면의 안내에 따라주세요.");
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [pathname]);

  return null; 
}