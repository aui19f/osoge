"use client";

import { getThreeMonthStats } from "@/app/master/(with-menu)/list/actions";
import StatisticsSkeleton from "@/components/dashboard/StatisticsSkeleton";
import { useLoadingStore } from "@/store/useLoading";
import { printStatusLabel } from "@/utils/constants/status";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Statistics({ storeId }: { storeId: string }) {
  const router = useRouter();
  const {setLoading} = useLoadingStore();
  const { data, isLoading } = useQuery({
    queryKey: ["three-month-stats", storeId],
    queryFn: async () => await getThreeMonthStats(storeId),
    staleTime: 1000 * 60 * 60 * 24, // 24시간 동안 '신선함' 유지
    gcTime: 1000 * 60 * 60 * 24, // 메모리에서도 24시간 보관
    refetchOnWindowFocus: false, // 탭 이동 시 재요청 금지
    refetchOnMount: false, // 페이지 재진입 시 재요청 금지
  });

  const onChangeUrl = (status: string) =>{
    setLoading(true);
    router.push(`/master/list?type=all&status=${status}&sort=desc`);
    
  }
  if (isLoading) return <StatisticsSkeleton />;

  return (
    <aside className="flex flex-col gap-2">
      <h3 className="text-lg font-bold text-slate-100">3개월 상태현황</h3>

      <ul className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto *:**:dark:text-gray-400">
        {data?.items &&
          Object.entries(data?.items).map(([status, count]) => (
            <li 
              key={status}
              className="relative flex items-center justify-center flex-1 group"
              onClick={()=>onChangeUrl(status)}
            >
              <div className="absolute inset-0 transition-all duration-500 bg-blue-400/20 rounded-3xl blur-2xl group-hover:bg-pink-400/30 " />

              <div
                className="relative w-full h-full 
                  bg-white/10 backdrop-blur-xl 
                  rounded-3xl border border-white/30 
                  shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
                  flex flex-col items-center justify-center
                  overflow-hidden py-4 "
              >
                <span className="font-medium tracking-widest uppercase text-blue-100/90">
                  {printStatusLabel(status)}
                </span>
                <span className="text-4xl font-black text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)] tracking-tighter">
                  {count}
                </span>
              </div>
            </li>
          ))}
      </ul>
    </aside>
  );
}
