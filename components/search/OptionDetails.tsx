"use client";
import Button from "@/components/forms/Button";
import Tabs from "@/components/forms/Tabs";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

import dayjs from "dayjs";
import { SORT_OPTIONS } from "@/utils/constants/sort";
import { STATUS_OPTIONS } from "@/utils/constants/status";
import SelectDate from "@/components/forms/SelectDate";
import { SearchFilters } from "@/app/admin/apply/actions";
import { EnumStatus } from "@prisma/client";

interface SearchOptionProps extends SearchFilters {
  onClose: () => void;
  onSearch: (e: SearchFilters) => void;
}

const DATE_OPTIONS = [
  { id: "day", label: "하루" },
  { id: "week", label: "일주일" },
  { id: "month", label: "월별" },
  { id: "all", label: "전체" },
];

export default function OptionDetails({
  onClose,
  onSearch,
  type,
  date,
  status,
  sort,
}: SearchOptionProps) {
  const [typeValue, setType] = useState(type);
  const [dateValue, setDate] = useState(date);
  const [statusValue, setStatus] = useState(status);
  const [sortValue, setSort] = useState(sort);

  // 월별 선택을 위한 상태
  const [selectedYear, setSelectedYear] = useState(
    dayjs(dateValue.start).year().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState(
    (dayjs(dateValue.start).month() + 1).toString()
  );

  const changeStatus = (obj: { id: EnumStatus; label: string }) => {
    setStatus((prev: EnumStatus[]) =>
      prev.includes(obj.id)
        ? prev.filter((item) => item !== obj.id)
        : [...prev, obj.id]
    );
  };

  // 기간 선택 핸들러
  const handleTypeChange = (newType: typeof type) => {
    setType(newType);

    if (newType === "all" || newType === "day") {
      setDate({
        start: dayjs().startOf("day").toDate(),
        end: dayjs().endOf("day").toDate(),
      });
    } else if (newType === "week") {
      setDate({
        start: dayjs().subtract(7, "day").startOf("day").toDate(),
        end: dayjs().endOf("day").toDate(),
      });
    } else if (newType === "month") {
      updateMonthRange({ year: selectedYear, month: selectedMonth });
    }
  };

  // 월별 데이터 업데이트 함수
  const updateMonthRange = ({
    year,
    month,
  }: {
    year: string;
    month: string;
  }) => {
    const formattedMonth = month.padStart(2, "0");
    const baseDate = dayjs(`${year}-${formattedMonth}-01`);

    setSelectedYear(year);
    setSelectedMonth(month);

    setDate({
      start: baseDate.startOf("month").toDate(),
      end: baseDate.endOf("month").toDate(),
    });
  };

  const handleSearch = () => {
    onSearch({
      type: typeValue,
      date: dateValue,
      status: statusValue,
      sort: sortValue,
    });
  };

  return (
    <motion.div
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed top-0 left-0 right-0 z-50 p-4 space-y-2 shadow-x4 bg-gray-50 rounded-b-2xl"
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

      <div className="p-4 space-y-2 bg-white rounded-md">
        <p className="text-lg font-bold">조회기간</p>
        <Tabs
          options={DATE_OPTIONS}
          selected={typeValue}
          onClick={(e) => handleTypeChange(e.id)}
        />
        {typeValue === "month" && (
          <div>
            <SelectDate
              year={selectedYear}
              month={selectedMonth}
              onChange={(e) => {
                updateMonthRange(e);
              }}
            />
          </div>
        )}
      </div>

      <div className="p-4 space-y-2 bg-white rounded-md">
        <p className="text-lg font-bold">상태</p>
        <Tabs
          options={STATUS_OPTIONS}
          selected={statusValue}
          onClick={(e) => changeStatus(e)}
        />
      </div>

      <div className="p-4 space-y-2 bg-white rounded-md">
        <p className="text-lg font-bold">정렬</p>
        <Tabs
          options={SORT_OPTIONS}
          selected={sortValue}
          onClick={(e) => setSort(e.id)}
        />
      </div>
      <div className=" [&>button]:w-full">
        <Button variant="primary" onClick={handleSearch}>
          검색
        </Button>
      </div>
    </motion.div>
  );
}
