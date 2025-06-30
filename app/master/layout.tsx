import MasterFooter from "@/components/master-footer";
import MasterHeader from "@/components/master-header";
import getSession from "@/lib/sesstion";
import { redirect } from "next/navigation";

export default async function MasterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();

  if (!session?.id || session.role !== "MASTER") {
    redirect("/login");
  }

  return (
    <div>
      <MasterHeader />
      <main className="h-[calc(100vh-80px)] overflow-auto pt-20">
        {children}
      </main>
      <MasterFooter />
    </div>
  );
}
