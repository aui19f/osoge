"use client";
import getListApply, { SearchFilters } from "@/app/admin/apply/actions";

import LineItem from "@/components/list/LineItem";
import LineItemSkeleton from "@/components/list/LIneListSkeleton";

import OptionDetails from "@/components/search/OptionDetails";
import SearchBar from "@/components/search/SearchBar";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Apply() {
  const [text, setText] = useState("");
  const [filterOptions, setFilterOptions] = useState<SearchFilters>({
    type: "day",
    date: { start: new Date(), end: new Date() },
    status: ["READY", "PROGRESS", "COMPLETED", "CANCEL"],
    sort: "desc",
  });

  const [isOption, setIsOption] = useState(false);

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["apply", text, filterOptions],
    queryFn: async () =>
      await getListApply({
        ...filterOptions, // type, date, status, sort가 들어있음
        text, // SearchOption의 text 필드에 name 대입
      }),
    staleTime: 1000 * 60, // 1분 캐시 유지
    enabled: false, // 수동 실행
    gcTime: 0, // 페이지 떠날 때 캐시 삭제
  });

  const filterSearch = async (e: SearchFilters) => {
    const { type, date, status, sort } = e;
    setFilterOptions({ type, date, status, sort });
    await setIsOption(false);
    await refetch();
  };

  const wordSearch = async (e: string) => {
    await setText(e);
    await refetch();
  };

  return (
    <>
      <SearchBar
        {...filterOptions}
        word={text}
        onFilter={() => setIsOption(true)}
        onSearch={(e) => wordSearch(e)}
      />

      <AnimatePresence>
        {isOption && (
          <OptionDetails
            onClose={() => setIsOption(false)}
            onSearch={(e) => filterSearch(e)}
            {...filterOptions}
          />
        )}
      </AnimatePresence>

      <ul>
        {isFetching ? (
          <LineItemSkeleton count={Math.floor(window.innerHeight / 100)} />
        ) : data && data.items.length > 0 ? (
          data.items.map((item) => (
            <LineItem key={item.id} {...item} replyType={"apply"} />
          ))
        ) : (
          <p className="m-4 text-center">데이터가 없습니다.</p>
        )}
      </ul>
    </>
  );
}
