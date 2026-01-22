"use client";
import { selectMasterRoleRes } from "@/app/actions/users";
import { getBaseUserInfo } from "@/app/admin/management/actions";

import { printPlanLabel } from "@/utils/constants/plan";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function RoleGuide({ userId }: { userId: string }) {
  // 클라이언트 (Component.tsx) - 사용자의 경험을 보호함
  const { data, isLoading } = useQuery<selectMasterRoleRes>({
    queryKey: ["dashboard-stats", userId],
    queryFn: async () => await getBaseUserInfo(userId), // 서버 액션 호출
    staleTime: 1000 * 60 * 60, // 1시간 동안 신선한 것으로 간주
    gcTime: 1000 * 60 * 60 * 24, // 데이터가 쓰이지 않아도 24시간 동안 메모리에 유지
    refetchOnWindowFocus: false, // 탭 전환 시 자동 재요청 끄기
    refetchOnMount: false, // 컴포넌트 재마운트 시 재요청 끄기 (이미 데이터가 있다면)
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
            data?.store[0].biz_type
              ? "type_" + data?.store[0].biz_type
              : "question"
          }.png`}
          alt="상점타입"
          width={64}
          height={64}
        />
        <div className="*:text-gray-100 text-center">
          <h1 className="text-xl font-bold ">{data?.store[0].name || "-"}</h1>
          <p>{data?.plan?.id ? printPlanLabel(data?.plan?.id) : ""} 사용 중</p>
        </div>
      </div>
      <div className="flex w-full gap-4">
        <div className="flex flex-col items-center justify-center flex-1 gap-1 py-2 rounded-sm bg-purple-50/10">
          <Image
            src={`/images/icons/${data?.plan?.register ? "use" : "unuse"}.png`}
            width={24}
            height={24}
            alt="접수사용중"
          />
          <p className="text-sm text-slate-50">접수</p>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 gap-1 py-2 rounded-sm bg-purple-50/10">
          <Image
            src={`/images/icons/${data?.plan?.print ? "use" : "unuse"}.png`}
            width={24}
            height={24}
            alt="접수증출력"
          />
          <p className="text-sm text-slate-50">라벨출력</p>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 gap-1 py-2 rounded-sm bg-purple-50/10">
          <Image
            src={`/images/icons/${
              data?.plan?.send_message ? "use" : "unuse"
            }.png`}
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
