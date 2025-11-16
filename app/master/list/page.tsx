"use client";
import { getListRegister } from "@/app/master/list/actions";
import Button from "@/components/forms/Button";

import SelectDate from "@/components/forms/SelectDate";
import Sort from "@/components/forms/Sort";
import Tabs from "@/components/forms/Tabs";
import ListItem from "@/components/master/ListItem";
import { FormOption } from "@/types/forms";
import { StatusOptions } from "@/types/StatusOptions";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import Link from "next/link";

import { useState } from "react";

export default function List() {
  const [selectedDate, setSelectedDate] = useState({
    year: dayjs().format("YYYY"),
    month: dayjs().format("MM"),
    day: dayjs().format("DD"),
  });

  const [status, setStatus] = useState<string[]>(["READY"]);
  const [sort, setSort] = useState<"desc" | "asc">("desc");

  // 실제 쿼리에 사용될 필터 상태
  const [filters, setFilters] = useState({
    selectedDate,
    status,
    sort,
  });

  const { data, refetch, isFetching, isError } = useQuery({
    queryKey: ["recipes", filters], // filters 상태에만 의존
    queryFn: async () => await getListRegister(filters),
    staleTime: 1000 * 60, // 1분 캐시 유지
    enabled: false, // 수동 실행
  });

  const changeStatus = (e: FormOption) => {
    if (status.includes(e.id)) {
      setStatus(status.filter((item) => item !== e.id));
    } else {
      setStatus([...status, e.id]);
    }
  };

  // 버튼 클릭 시 refetch 실행
  const handleSearch = () => {
    // 현재 UI의 필터 값들로 실제 쿼리 필터를 업데이트합니다.
    setFilters({
      selectedDate,
      status,
      sort,
    });
    refetch();
  };

  return (
    <div>
      <div className="flex flex-col gap-2 p-2 mb-2 shadow-md dark:border dark:border-gray-800">
        <div className="flex flex-col gap-1">
          <SelectDate
            {...selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />

          <div className="flex items-center gap-1">
            <Tabs
              options={StatusOptions}
              selected={status}
              className="flex-1"
              onClick={(e) => {
                changeStatus(e);
              }}
            />

            <Sort
              value={sort}
              isLabel={false}
              onClick={() =>
                setSort((prev) => (prev === "desc" ? "asc" : "desc"))
              }
            />

            <Button variant="primary" onClick={handleSearch}>
              조회
            </Button>
          </div>
        </div>
      </div>

      <ul className="flex flex-col gap-2 px-2">
        {data &&
          data.map((item: any) => (
            <li
              className="relative px-2 py-4 border-b border-b-gray-200"
              key={item.id}
            >
              <Link href={`list/123`} scroll={false}>
                <ListItem {...item} />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
