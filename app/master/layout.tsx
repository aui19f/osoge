"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MasterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [title, setTitle] = useState("어서오게(OSOGE)");
  const pathname = usePathname();
  const masterMenu = [
    { name: "menu_home", path: "/master", title: "어서오게(OSOGE)" },
    { name: "menu_list", path: "/master/list", title: "목록" },
    { name: "menu_search", path: "/master/search", title: "검색" },
    { name: "menu_registration", path: "/master/receive", title: "접수" },
    { name: "menu_settings", path: "/master/settings", title: "설정" },
  ];
  // const current = masterMenu.find((menu) => {
  //   console.log("menu.path", menu.path);
  //   return pathname.startsWith(menu.path);
  // });
  // const title = current?.title || "어서오게(OSOGE)";

  useEffect(() => {
    const current = masterMenu
      .sort((a, b) => b.path.length - a.path.length)
      .find((menu) => pathname.startsWith(menu.path));
    setTitle(current?.title || "기본 타이틀");
  }, [pathname]); // pathname이 바뀔 때마다 실행됨

  return (
    <div>
      <div className="flex items-center justify-center h-20 bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-400">{title}</h2>
      </div>
      <main className="h-[calc(100vh-160px)] overflow-auto">{children}</main>
      <footer className="flex h-20">
        {masterMenu.map((item) => {
          // "/"는 정확히 일치해야만 홈으로 간주
          const isActive =
            item.path === "/master"
              ? pathname === "/master"
              : pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              href={item.path}
              className="flex items-center justify-center flex-1 w-full"
            >
              <Image
                src={
                  isActive
                    ? `/images/${item.name}_active.png`
                    : `/images/${item.name}.png`
                }
                alt={`${item.name} icon`}
                width={32}
                height={32}
              />
            </Link>
          );
        })}
      </footer>
    </div>
  );
}
