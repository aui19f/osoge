"use client";

import { getBaseUserInfo } from "@/app/master/(with-menu)/(dashboard)/actions";
import { printPlanLabel } from "@/utils/constants/plan";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function RoleGuide({ userId }: { userId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-stats", userId],
    queryFn: () => getBaseUserInfo(userId),
    enabled: !!userId, // userId가 있을 때만 실행
    staleTime: 1000 * 60 * 60, // 1시간 동안 브라우저 메모리의 데이터를 신선하다고 간주
    gcTime: 1000 * 60 * 60 * 24, // 캐시가 비활성화되어도 24시간 동안 메모리 유지

    // 탭 전환이나 마운트 시 재요청을 엄격하게 제한 (비용 절감 핵심)
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    select: (response) => response.items,
  });

  if (isLoading)
    return (
      <aside className="min-h-[30vh] flex items-center justify-center  flex-col py-8 gap-2">
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md" />
        <div className="w-32 h-6 rounded-md bg-white/5" />
        <div className="flex w-full mt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center flex-1 gap-2">
              <div className="w-6 h-6 rounded-full bg-white/30" />
              <div className="w-10 h-3 rounded bg-white/10" />
            </div>
          ))}
        </div>
      </aside>
    );
  return (
    <aside className="min-h-[30vh] flex items-center justify-center  flex-col py-8 gap-2">
      <div className="flex flex-col items-center w-full gap-4 py-4 rounded-md ">
        <Image
          src={`/images/icons/master/${
            data?.biz_type ? "type_" + data?.biz_type : "question"
          }.png`}
          alt="상점타입"
          width={64}
          height={64}
        />
        <div className="*:text-gray-100 text-center">
          <h1 className="text-xl font-bold ">{data?.name || "-"}</h1>
          {data?.id && <p>{printPlanLabel(data?.id)} 사용 중</p>}
        </div>
      </div>
      <div className="flex w-full gap-4">
        <div className="flex flex-col items-center justify-center flex-1 gap-1 py-2 rounded-sm bg-purple-50/10">
          <Image
            src={`/images/icons/${data?.register ? "use" : "unuse"}.png`}
            width={24}
            height={24}
            alt="접수사용중"
          />
          <p className="text-sm text-slate-50">접수</p>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 gap-1 py-2 rounded-sm bg-purple-50/10">
          <Image
            src={`/images/icons/${data?.print ? "use" : "unuse"}.png`}
            width={24}
            height={24}
            alt="접수증출력"
          />
          <p className="text-sm text-slate-50">라벨출력</p>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 gap-1 py-2 rounded-sm bg-purple-50/10">
          <Image
            src={`/images/icons/${data?.send_message ? "use" : "unuse"}.png`}
            width={24}
            height={24}
            alt="완료메시지전송"
          />
          <p className="text-sm text-slate-50">완료메시지</p>
        </div>
      </div>
    </aside>
  );
}
