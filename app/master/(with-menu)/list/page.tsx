"use client";
import { useState } from "react";
import SearchBar from "@/components/search/SearchBar";
import { SearchFilters } from "@/app/admin/apply/actions";
import { AnimatePresence } from "framer-motion";
import OptionDetails from "@/components/search/OptionDetails";
import { useQuery } from "@tanstack/react-query";
import { getListRegister } from "@/app/master/(with-menu)/list/actions";
import dayjs from "dayjs";
import LineItemSkeleton from "@/components/list/LIneListSkeleton";
import LineItem from "@/components/list/LineItem";

export default function List() {
  const [text, setText] = useState("");
  const [filterOptions, setFilterOptions] = useState<SearchFilters>({
    type: "day",
    date: {
      start: dayjs().startOf("day").toDate(),
      end: dayjs().endOf("day").toDate(),
    },
    status: ["READY", "PROGRESS", "COMPLETED", "CANCEL"],
    sort: "desc",
  });
  const [isOption, setIsOption] = useState(false);

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["recipes", text, filterOptions], // filters 상태에만 의존
    queryFn: async () =>
      await getListRegister({
        ...filterOptions,
        text,
      }),
    staleTime: 1000 * 60, // 1분 캐시 유지
    // enabled: false, // 수동 실행
    gcTime: 0, // 페이지 떠날 때 캐시 삭제
  });

  const wordSearch = async (e: string) => {
    await setText(e);
    await refetch();
  };

  const filterSearch = async (e: SearchFilters) => {
    const { type, date, status, sort } = e;
    setFilterOptions({ type, date, status, sort });
    setIsOption(false);
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
