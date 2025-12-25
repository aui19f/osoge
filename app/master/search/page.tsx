"use client";
import { TypeRegisterItem } from "@/app/master/list/actions";
import { searchReceiptList } from "@/app/master/search/actions";
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Sort from "@/components/forms/Sort";
import Loading from "@/components/loading/DefaultLoading";

import ListItem from "@/components/master/ListItem";

import { SearchType, SortOrder } from "@/types/common";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Search() {
  const [type, setType] = useState<SearchType>("receipt");
  const [value, setValue] = useState("");
  const [sort, setSort] = useState<SortOrder>("desc");
  const [searchParams, setSearchParams] = useState({ type, value, sort });

  const typeOptions = [
    { id: "receipt", label: "접수번호" },
    { id: "phone", label: "핸드폰" },
  ];

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["search", searchParams],
    queryFn: async () => await searchReceiptList({ type, value, sort }),
    staleTime: 1000 * 60,
    enabled: false, // 핵심!
    gcTime: 0, // 페이지 떠날 때 캐시 삭제
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const changeType = (type: string) => {
    setType(type as SearchType);
  };

  const handleSearch = async () => {
    await setSearchParams({ type, value, sort });
    await refetch();
  };

  const isValidInput = value.trim().length >= 3;
  return (
    <>
      <div className="flex gap-1 p-2 mb-2 shadow-md dark:border dark:border-gray-800">
        <Select
          name="type"
          options={typeOptions}
          selected={type}
          className="w-22"
          onChange={(e) => changeType(e.target.value)}
        />

        <div className="flex-1">
          <Input
            name={type}
            value={value}
            autoComplete="off"
            placeholder={`${
              type === "phone"
                ? "핸드폰번호를 입력해주세요"
                : "접수번호를 입력해주세요."
            }`}
            onKeyDown={handleKeyDown}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <Sort
          value={sort}
          isLabel={false}
          onClick={() => setSort((prev) => (prev === "desc" ? "asc" : "desc"))}
        />
        <Button
          variant="primary"
          type="button"
          disabled={!isValidInput || isFetching}
          onClick={handleSearch}
        >
          조회
        </Button>
      </div>

      {!isValidInput && value && (
        <p className="text-sm text-center text-gray-500 ">
          최소 3자 이상 입력하세요
        </p>
      )}

      {data?.length === 0 && (
        <p className="my-6 text-sm text-center text-red-400">
          검색 결과가 없습니다
        </p>
      )}

      <ul className="flex flex-col gap-2 px-2">
        {data?.map((item: TypeRegisterItem) => (
          <ListItem
            key={item.id}
            {...item}
            type={searchParams.type}
            word={searchParams.value}
          />
        ))}
      </ul>
      {isFetching && <Loading />}
    </>
  );
}

// 검색은 기본 1년전까지만 확인 하고 더 필요한 경우는 별도 페이지 제작
