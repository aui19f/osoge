import Navigation from "@/components/layout/Navigation";
import { ADMIN_MENU } from "@/utils/constants/menu";

export default function AdminLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-950">
      <main className="flex-1 pb-16 overflow-y-auto">
        {children}
        {modal}
      </main>
      <Navigation role="admin" menus={ADMIN_MENU} />
    </div>
  );
}
