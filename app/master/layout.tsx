"use client";
import MenuItem from "@/components/layout/MenuItem";
import { usePathname } from "next/navigation";
import path from "path";

export default function MasterLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const pathname = usePathname();
  console.log("[[pathname]]", pathname);

  const menu = [
    { label: "홈", icon: "menu_home", url: "/master" },
    { label: "리스트", icon: "menu_list", url: "/master/list" },
    { label: "검색", icon: "menu_search", url: "/master/search" },
    // { label: "전송", icon: "", url: "/master/send" },
    { label: "설정", icon: "menu_settings", url: "/master/setting" },
  ];

  // const isRegister =

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 pb-18">
        {children}
        {modal}
      </main>

      {pathname !== "/master/register" && (
        <ul className="fixed bottom-0 left-0 right-0 flex h-16 bg-gray-100 border-t border-t-white">
          {menu.map((item) => (
            <MenuItem key={item.url.replace("/", "")} {...item} />
          ))}
        </ul>
      )}
    </div>
  );
}
