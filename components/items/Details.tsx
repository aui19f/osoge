"use client";

import { getRegisterById } from "@/app/master/(with-menu)/list/actions";

import { ModalHeader } from "@/components/modal/ModalParts";
import DetailForm from "@/components/items/DetailForm";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
export default function ItemDetails({
  id,
  type,
}: {
  id: string;
  type: string;
}) {
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery({
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
    return (
      <>
        <div className="p-4 border-b">로딩 중...</div> {/* 헤더 가짜 UI */}
        <DetailSkeleton />
      </>
    );
  }

  if (isError || !data) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <>
      <ModalHeader title={data.display_id} onClose={onClose} />
      <DetailForm item={data} id={id} onClose={onClose} />
    </>
  );
}

// 단순한 스켈레톤 컴포넌트
const DetailSkeleton = () => (
  <div className="p-4 space-y-4">
    {/* 헤더 부분 스켈레톤 */}
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="w-1/3 h-8 bg-gray-200 rounded"
    />
    <hr className="border-gray-100" />
    {/* 폼 내용 스켈레톤 */}
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
          className="w-full h-12 bg-gray-100 rounded"
        />
      ))}
    </div>
  </div>
);
