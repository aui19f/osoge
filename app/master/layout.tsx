"use client";

import { fetchReceiveById } from "@/app/master/search/[id]/actions";
import MasterFooter from "@/components/master-footer";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const masterMenu = [
  { name: "menu_home", path: "/master", title: "어서오게(OSOGE)" },
  { name: "menu_list", path: "/master/list", title: "목록" },
  { name: "menu_search", path: "/master/search", title: "검색" },
  { name: "menu_registration", path: "/master/receive", title: "접수" },
  { name: "menu_settings", path: "/master/settings", title: "설정" },
];

export default function MasterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [showHeader, setShowHeader] = useState(true);
  const lastScroll = useRef(0);

  const [title, setTitle] = useState("어서오게(OSOGE)");
  const pathname = usePathname();

  const getId = async (id: string) => {
    const result = await fetchReceiveById(id);
    if (result && result.serialCode) {
      setTitle(result.serialCode);
    } else {
      alert("잘못된 정보입니다.");
      return false;
    }
  };

  useEffect(() => {
    const pathParts = pathname.split("/");
    // 1. "/master/receive/[id]" 형태인지 확인
    if (pathname.startsWith("/master/search/") && pathParts.length === 4) {
      const id = decodeURIComponent(pathParts[3]); // %인코딩 방지
      getId(id);
    }

    const current = [...masterMenu]
      .sort((a, b) => b.path.length - a.path.length)
      .find((menu) => pathname.startsWith(menu.path));
    setTitle(current?.title || "어서오게(OSOGE)");
  }, [pathname]); // pathname이 바뀔 때마다 실행됨

  // ⭐ 스크롤 방향 감지
  useEffect(() => {
    const mainEl = document.querySelector("main");

    if (!mainEl) return;

    const handleScroll = () => {
      const currentScroll = mainEl.scrollTop;
      if (currentScroll > lastScroll.current && currentScroll > 50) {
        setShowHeader(false); // 아래로 → 숨기기
      } else {
        setShowHeader(true); // 위로 → 보이기
      }
      lastScroll.current = currentScroll;
    };

    mainEl.addEventListener("scroll", handleScroll);
    return () => mainEl.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        } bg-slate-50 flex items-center justify-center h-20 shadow-md`}
      >
        <h2 className="text-2xl font-bold text-slate-400">{title}</h2>
      </div>
      <main className="h-[calc(100vh-80px)] overflow-auto pt-20">
        {children}
      </main>
      <MasterFooter pathname={pathname} menus={masterMenu} />
    </div>
  );
}
