"use client";
import { SearchFilters } from "@/app/admin/apply/actions";
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";

import { formatSortKo } from "@/utils/constants/sort";
import { formatStatusKo } from "@/utils/constants/status";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";

interface searchBarPropts extends SearchFilters {
  word: string;
  onSearch: (e: string) => void;
  onFilter: () => void;
}

export default function SearchBar({
  word,
  type,
  date,
  status,
  sort,
  onSearch,
  onFilter,
}: searchBarPropts) {
  const [txt, setTxt] = useState(word);

  const renderDateText = () => {
    if (type === "day") return "오늘";
    if (type === "all") return "전체";
    if (date.start && date.end) {
      const start = dayjs(date.start).format("YYYY/MM/DD");
      const end = dayjs(date.end).format("YYYY/MM/DD");
      return `${start} ~ ${end}`;
    }
    return "기간 없음";
  };

  const handleSearch = () => {
    onSearch(txt);
  };

  return (
    <div className="p-4 bg-slate-50">
      <div className="flex gap-2 [&>input]:flex-1">
        <Input
          name="word"
          value={txt}
          onChange={(e) => setTxt(e.target.value)}
        />
        <Button onClick={handleSearch}>검색</Button>
        <div
          className="flex items-center gap-1 px-1 border rounded-sm border-slate-400"
          onClick={onFilter}
        >
          <span>필터</span>
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
          {status?.map((x) => (
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
  );
}
