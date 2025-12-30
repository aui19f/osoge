import Navigation from "@/components/layout/Navigation";
import { MASTER_MENU } from "@/utils/constants/menu";

export default function MasterLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-950">
      <main className="flex-1 overflow-y-auto">
        {children}
        {modal}
      </main>
      <Navigation menus={MASTER_MENU} />
    </div>
  );
}
