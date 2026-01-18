"use client";

import { getApplyById } from "@/app/admin/apply/actions";
import ApplyDetailsForm from "@/components/items/ApplyDetailsForm";

import { ModalHeader } from "@/components/modal/ModalParts";
import ModalSkeleton from "@/components/modal/ModalSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function ApplyDetails({
  id,
  type,
}: {
  id: string;
  type: string;
}) {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["apply", id],
    queryFn: async () => await getApplyById(id),
    staleTime: 1000 * 60 * 5, // 5분 동안은 캐시된 데이터가 "신선(fresh)"하다고 판단하여 DB를 재조회하지 않음
    gcTime: 1000 * 60 * 30, // 30분 동안 사용되지 않으면 메모리에서 삭제 (Garbage Collection)
    retry: 1, // 실패 시 재시도 횟수 제한 (무료 티어 보호)
  });

  const handleClose = () => {
    if (type === "modal") {
      router.back();
    }
    if (type === "page") {
      router.push("/admin/apply");
    }
  };

  if (isLoading) {
    return <>{type === "modal" && isLoading && <ModalSkeleton />}</>;
  }

  if (isError || !data) return <div>데이터를 불러올 수 없습니다.</div>;
  return (
    <>
      <ModalHeader title={`${data?.item?.name || "-"}`} onClose={handleClose} />
      {data?.item && (
        <ApplyDetailsForm
          item={data.item}
          id={id}
          type={type}
          onClose={handleClose}
        />
      )}
    </>
  );
}
