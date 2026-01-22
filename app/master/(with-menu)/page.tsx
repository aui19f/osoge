import Link from "next/link";
import RoleGuide from "@/components/dashbaord/RoleGuide";
import Statistics from "@/components/dashbaord/Statistics";
import ChartSection from "@/components/dashbaord/ChartSection";
import RealtimeStatus from "@/components/dashbaord/RealtimeStatus";
import Image from "next/image";

export default function Master() {
  const userId = "6c3e2455-4ab5-4639-9c3e-7688041d3570";
  const storeId = "9e97b969-ff73-4f5d-89e7-b357a38e5da2";
  return (
    <article className="relative flex flex-col flex-1 ">
      <div className="absolute inset-0 ">
        <Image
          src="/images/background/glassmorphism_01.jpg"
          alt="background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className="z-10 flex flex-col h-full gap-4 px-4">
        <RoleGuide userId={userId} />
        <Link
          href="/master/register"
          target="_blank"
          rel="noopener noreferrer" // 보안과 성능을 위해 권장됩니다.
        >
          <div className="w-full px-8 py-4 font-bold text-center text-white transition-all duration-300 border rounded-full backdrop-blur-xl border-white/40 bg-linear-to-br from-blue-400/80 to-purple-600/60 ">
            접수 시작하기
          </div>
        </Link>
        <div className="flex flex-col flex-1 gap-6 px-4 pt-4 pb-6 border-t rounded-tl-3xl rounded-tr-3xl dark:bg-gray-800 bg-white/10 backdrop-blur-xl border-white/20">
          <RealtimeStatus storeId={storeId} />
          <ChartSection />
          <Statistics storeId={storeId} />
        </div>
      </div>
    </article>
  );
}
