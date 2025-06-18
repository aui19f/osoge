"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MasterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  const masterMenu = [
    { name: "menu_home", path: "/master" },
    { name: "menu_list", path: "/master/list" },
    { name: "menu_search", path: "/master/search" },
    { name: "menu_registration", path: "/master/receive" },
    { name: "menu_settings", path: "/master/settings" },
  ];

  return (
    <div>
      <div className="flex items-center justify-center h-20 bg-slate-50">
        <h2 className="text-3xl font-bold text-slate-400">TITLE</h2>
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
