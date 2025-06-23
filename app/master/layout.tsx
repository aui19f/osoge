"use client";

import { fetchReceiveById } from "@/app/master/search/[id]/actions";
import MasterFooter from "@/components/master-footer";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [title, setTitle] = useState("어서오게(OSOGE)");
  const pathname = usePathname();

  useEffect(() => {
    const pathParts = pathname.split("/");

    // 1. "/master/receive/[id]" 형태인지 확인
    if (pathname.startsWith("/master/search/") && pathParts.length === 4) {
      const id = decodeURIComponent(pathParts[3]); // %인코딩 방지
      fetchReceiveById(id).then((res) => {
        if (res && res.serialCode) {
          setTitle(res?.serialCode);
        } else {
          //없는 아이디이니 뒤로보내기..
        }
      });
      return;
    }

    const current = [...masterMenu]
      .sort((a, b) => b.path.length - a.path.length)
      .find((menu) => pathname.startsWith(menu.path));
    setTitle(current?.title || "어서오게(OSOGE)");
  }, [pathname]); // pathname이 바뀔 때마다 실행됨

  return (
    <div>
      <div className="flex items-center justify-center h-20 bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-400">{title}</h2>
      </div>
      <main className="h-[calc(100vh-160px)] overflow-auto">{children}</main>
      <MasterFooter pathname={pathname} menus={masterMenu} />
    </div>
  );
}
