"use client";

import { getRegisterById } from "@/app/master/(with-menu)/list/actions";

import { ModalHeader } from "@/components/modal/ModalParts";
import DetailForm from "@/components/items/RegisterDetailForm";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ModalSkeleton from "@/components/modal/ModalSkeleton";
export default function RegisterDetails({
  id,
  type,
}: {
  id: string;
  type: string;
}) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["register", id],
    queryFn: async () => {
      const response = await getRegisterById(id);
      if (response?.status !== 200) {
        throw new Error(response?.message || "데이터를 불러오지 못했습니다.");
      }
      return response.items; // Prisma 결과물 반환
    },
    // 핵심 설정: DB 조회를 아끼기 위한 옵션
    staleTime: 1000 * 60 * 5, // 5분 동안은 캐시된 데이터가 "신선(fresh)"하다고 판단하여 DB를 재조회하지 않음
    gcTime: 1000 * 60 * 30, // 30분 동안 사용되지 않으면 메모리에서 삭제 (Garbage Collection)
    retry: 1, // 실패 시 재시도 횟수 제한 (무료 티어 보호)
  });

  const onClose = () => {
    if (type === "modal") {
      router.back();
    }
    if (type === "page") {
      router.push("/master/list");
    }
  };

  if (isLoading) {
    return <>{type === "modal" && isLoading && <ModalSkeleton />}</>;
  }

  if (isError || !data) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <>
      <ModalHeader title={data.display_id} onClose={onClose} />
      <DetailForm item={data} id={id} onClose={onClose} />
    </>
  );
}
