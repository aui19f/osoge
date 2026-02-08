"use client";
import Button from "@/components/forms/Button";
import Image from "next/image";
import { motion } from "framer-motion";
import { SearchBarInput } from "@/schemas/search";
import { useFormContext } from "react-hook-form";
import SortFilter from "@/components/search/filters/SortFilter";
import DateFilter from "@/components/search/filters/DateFilter";
import StatusFilter from "@/components/search/filters/StatusFilter";
import { usePathname, useRouter } from "next/navigation";


interface SearchFilterProps {
  onClose: () => void;
}
export default function SearchFilter({ onClose }: SearchFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { getValues } = useFormContext<SearchBarInput>();

  const onValid = () => {
    const params = new URLSearchParams();
    const getData = getValues();
    Object.entries(getData).forEach(([key, value]) => {
      // 2. 값이 비어있는 경우 파라미터에서 삭제 (깔끔한 URL 유지)
      if (!value || (Array.isArray(value) && value.length === 0)) {
        params.delete(key);
        return;
      }

      // 3. 데이터 타입별 예외 처리
      if (key === "date" && typeof value === "object") {

        const { start, end } = value as { start: Date; end: Date };

        if (start) params.set("start", start.toISOString());
        if (end) params.set("end", end.toISOString());
        console.log("start, end", start, end)
      }

      else if (Array.isArray(value)) {
        // status: ['READY', 'DONE'] -> status=READY,DONE
        params.set(key, value.join(","));
      }
      else {
        // 일반 문자열이나 숫자
        params.set(key, String(value));
      }
    });

    router.push(`${pathname}?${params.toString()}`);

    onClose();
  };



  return (
    <motion.div
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="[&>button]:w-full fixed top-0 left-0 right-0 z-50 p-4 space-y-2 shadow-x4 bg-gray-50 rounded-b-2xl"
    >
      <div className="flex ">
        <h2 className="flex-1 text-3xl font-bold">검색옵션</h2>
        <div onClick={onClose}>
          <Image
            src="/images/icons/close.png"
            width={24}
            height={24}
            alt="닫기"
          />
        </div>
      </div>

      <DateFilter />
      <StatusFilter />
      <SortFilter />

      <Button type="button" variant="primary" onClick={onValid}>
        검색
      </Button>

    </motion.div>
  );
}
