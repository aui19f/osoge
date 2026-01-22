"use client";
import { getTodayHourlyStats } from "@/app/master/(with-menu)/actions";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/ko";

export default function RealtimeStatus({ storeId }: { storeId: string }) {
  dayjs.locale("ko"); // 2. 전역 로케일을 한국어로 설정
  const { data, isLoading } = useQuery({
    queryKey: ["today-hourly-stats", storeId],
    queryFn: () => getTodayHourlyStats(storeId),
    // 3개월 통계와 달리 짧게 설정 (예: 5분)
    staleTime: 1000 * 60 * 5,
    // 윈도우 포커스 시 최신 데이터를 보여주도록 설정
    refetchOnWindowFocus: true,
  });
  return (
    <aside className="flex flex-col gap-2 text-center">
      <h3 className="text-slate-100">
        {dayjs().format("YYYY년 M월 D일 dddd")} 접수 현황
      </h3>

      <span className="text-7xl font-black text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)] tracking-tighter">
        {isLoading ? (
          <div className="relative flex items-center justify-center m-auto size-20">
            <div className="absolute inset-0 bg-white/5 rounded-3xl blur-2xl" />
            <div className="relative flex flex-col items-center justify-center w-full h-full gap-3 py-4 overflow-hidden border bg-white/5 backdrop-blur-xl rounded-3xl border-white/20"></div>
          </div>
        ) : (
          data?.items
        )}
      </span>
    </aside>
  );
}
