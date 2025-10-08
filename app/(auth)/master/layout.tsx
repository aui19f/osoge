import MasterFooter from "@/components/master-footer";
import MasterHeader from "@/components/master-header";

export default async function MasterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
