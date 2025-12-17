"use client";
import MenuItem from "@/components/layout/MenuItem";
import { usePathname, useRouter } from "next/navigation";

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
export default function MasterLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  // const router = useRouter();

  const pathname = usePathname();
  // const { user } = useUserStore();
  const menu = [
    { label: "홈", icon: "menu_home", url: "/master" },
    { label: "리스트", icon: "menu_list", url: "/master/list" },
    { label: "검색", icon: "menu_search", url: "/master/search" },
    { label: "설정", icon: "menu_settings", url: "/master/setting" },
  ];

  // useEffect(() => {
  //   if (!user) {
  //     router.replace("/");
  //   }
  // }, [router, user]);

  return (
    <>
      {/* {user && ( */}
      <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-950">
        <main
          className={`flex-1 overflow-y-auto  ${
            pathname !== "/master/register" && "pb-16"
          }`}
        >
          {children}
          {modal}
        </main>

        {pathname !== "/master/register" && (
          <ul className="fixed bottom-0 left-0 right-0 flex h-16 bg-gray-100 border-t border-t-white dark:bg-gray-900 dark:border-t-black">
            {menu.map((item) => (
              <MenuItem key={item.url.replace("/", "")} {...item} />
            ))}
          </ul>
        )}
      </div>
      {/* )} */}
    </>
  );
}
