import PreventBackHandler from "@/components/common/PreventBackHandler";

export default function KioskLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-screen overflow-hidden">
      <PreventBackHandler /> 
      {children}
    </section>
  );
}