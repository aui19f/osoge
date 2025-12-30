"use client";

import Navigation from "@/components/layout/Navigation";
import { MASTER_MENU } from "@/utils/constants/menu";
import { usePathname } from "next/navigation";

export default function MasterLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
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
        <Navigation role="admin" menus={MASTER_MENU} />
      )}
    </div>
  );
}
