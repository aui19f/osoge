"use client";
import Button from "@/components/forms/Button";
import SearchFilter from "@/components/search/SearchFilter";
import { SearchBarInput, searchBarSchema } from "@/schemas/search";
import { DATE_LABELS } from "@/utils/constants/date";
import { formatSortKo } from "@/utils/constants/sort";
import { formatStatusKo } from "@/utils/constants/status";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function SearchBar({
  initialFilters,
}: {
  initialFilters: SearchBarInput;
}) {
  const router = useRouter();
  const pathname = usePathname(); // ⭐️ 현재 경로 (예: "/list", "/dashboard")를 가져옴
  const searchParams = useSearchParams();
  const [isFilter, setIsFilter] = useState(false);
  const methods = useForm<SearchBarInput>({
    resolver: zodResolver(searchBarSchema),
    mode: "onTouched",
    defaultValues: initialFilters,
  });
  const { reset, watch, getValues } = methods;

  const currentFilters = watch() as SearchBarInput;
  const sort = watch("sort");

  const renderDateText = () => {
    const { type, date } = currentFilters;
    if (type !== "month" && DATE_LABELS[type]) {
      return DATE_LABELS[type];
    }
    if (date?.start && date?.end) {
      const start = dayjs(date.start).format("YYYY/MM/DD HH:mm");
      const end = dayjs(date.end).format("YYYY/MM/DD HH:mm");
      return `${start} ~ ${end}`;
    }
    return "날짜 선택";
  };

  const updateSingleParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString()); // 복사
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleApply = () => {
    updateSingleParam("word", getValues("word"));
  };

  useEffect(() => {
    reset(initialFilters);
  }, [initialFilters, reset]);

  return (
    <FormProvider {...methods}>
      <form>
        <div className="p-4 bg-slate-50">
          <div className="flex gap-2 [&>input]:flex-1">
            <input
              {...methods.register("word")}
              placeholder="검색어를 입력하세요"
            />

            <Button type="button" variant="dark" onClick={() => handleApply()}>
              검색
            </Button>
            <div
              className="flex items-center gap-1 px-1 rounded-sm bg-slate-600"
              onClick={() => setIsFilter(true)}
            >
              <span className="text-white">필터</span>
              <Image
                src="/images/icons/filter.png"
                width={24}
                height={24}
                alt="filter"
              />
            </div>
          </div>

          <div className="flex gap-1 py-1 text-sm text-slate-400">
            <p>
              날짜: <span>{renderDateText()}</span>
            </p>
            <span>|</span>

            <p>
              상태:
              {currentFilters.status?.map((x: string) => (
                <span className="ml-0.5" key={x}>
                  {formatStatusKo(x)}
                </span>
              ))}
            </p>
            <span>|</span>
            <p>
              정렬:<span>{formatSortKo(sort)}</span>
            </p>
          </div>
        </div>
        <AnimatePresence>
          {isFilter && <SearchFilter onClose={() => setIsFilter(false)} />}
        </AnimatePresence>
      </form>
    </FormProvider>
  );
}
