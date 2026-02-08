"use client";
import Button from "@/components/forms/Button";
import SearchFilter from "@/components/search/SearchFilter";
import Summarize from "@/components/search/Summarize";
import { SearchBarInput, searchBarSchema } from "@/schemas/search";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";


import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function SearchBar({
  initialFilters,
}: {
  initialFilters: SearchBarInput;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isFilter, setIsFilter] = useState(false);

  const methods = useForm<SearchBarInput>({
    resolver: zodResolver(searchBarSchema),
    mode: "onTouched",
    defaultValues: initialFilters,
  });
  const { reset, getValues, watch } = methods;


  const updateSingleParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString()); // 복사
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleApply = () => {
    updateSingleParam("word", getValues("word"));
  };

  const currentFilters = watch() as SearchBarInput;


  useEffect(() => {
    reset(initialFilters);
  }, [initialFilters, reset]);

  return (
    <FormProvider {...methods}>
      <form>
        <div className="p-2 bg-slate-50">
          <div className="flex gap-2 [&>input]:flex-1">
            <input
              {...methods.register("word")}
              placeholder="검색어를 입력하세요"
            />
            <Button type="button" variant="dark" onClick={() => handleApply()}>
              검색
            </Button>
            <Button type="button" variant="dark" onClick={() => setIsFilter(true)}>
              필터
            </Button>
          </div>
          <Summarize {...currentFilters} />
        </div>


        <AnimatePresence>
          {isFilter && <SearchFilter onClose={() => setIsFilter(false)} />}
        </AnimatePresence>
      </form>
    </FormProvider >
  );
}
