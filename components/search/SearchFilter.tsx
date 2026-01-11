"use client";
import Button from "@/components/forms/Button";
import Tabs from "@/components/forms/Tabs";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

import dayjs from "dayjs";
import { SORT_OPTIONS } from "@/utils/constants/sort";
import { STATUS_OPTIONS } from "@/utils/constants/status";

import { EnumStatus } from "@prisma/client";
import { DateTarget, SearchBarInput, SortTarget } from "@/schemas/search";
import { useFormContext } from "react-hook-form";
import { DATE_OPTIONS } from "@/utils/constants/date";
import SelectDate from "@/components/forms/SelectDate";
import { usePathname, useRouter } from "next/navigation";
import { DateFields } from "@/types/common";

interface SearchFilterProps {
  onClose: () => void;
}
export default function SearchFilter({ onClose }: SearchFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { getValues, handleSubmit } = useFormContext<SearchBarInput>();
  const [draft, setDraft] = useState({
    status: getValues("status"),
    type: getValues("type"),
    sort: getValues("sort"),
    date: getValues("date"),
    word: getValues("word"),
  });

  const changeStatus = (e: EnumStatus) => {
    setDraft({
      ...draft,
      status: draft.status.includes(e)
        ? draft.status.filter((x) => x != e)
        : [...draft.status, e],
    });
  };

  const changeType = (newType: DateTarget) => {
    setDraft((prev) => {
      let newDate = prev.date;

      if (newType === "day") {
        newDate = {
          start: dayjs().startOf("day").toDate(),
          end: dayjs().endOf("day").toDate(),
        };
      } else if (newType === "week") {
        newDate = {
          start: dayjs().subtract(7, "day").startOf("day").toDate(),
          end: dayjs().endOf("day").toDate(),
        };
      } else if (newType === "month") {
        newDate = {
          start: draft.date.start
            ? dayjs(draft.date.start).startOf("month").toDate()
            : dayjs().startOf("month").toDate(),

          end: draft.date.end
            ? dayjs(draft.date.end).endOf("month").toDate()
            : dayjs().endOf("month").toDate(),
        };
      }

      return { ...prev, type: newType, date: newDate };
    });
  };

  const changeDate = ({ year, month }: DateFields) => {
    const start = dayjs(`${year}-${month}-01`).toDate();
    const end = dayjs(`${year}-${month}-01`).endOf("month").toDate();
    setDraft({
      ...draft,
      date: {
        start,
        end,
      },
    });
  };

  const onValid = () => {
    const params = new URLSearchParams();
    params.set("type", draft.type);
    if (draft.type !== "all") {
      if (draft.date.start) {
        params.set("start", draft.date.start.toISOString());
      }
      if (draft.date.end) {
        params.set("end", draft.date.end.toISOString());
      }
    }
    params.set("status", draft.status.join(","));
    params.set("sort", draft.sort);
    params.set("word", draft.word);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    onClose();
  };

  const handleApply = () => {
    handleSubmit(onValid)();
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
        <p className="text-lg font-bold">
          조회기간[{dayjs(draft.date.start).format("MM")}]
        </p>
        <Tabs
          options={DATE_OPTIONS}
          selected={draft.type}
          onChange={(e) => changeType(e as DateTarget)}
        />
        {draft.type === "month" && (
          <div>
            <SelectDate
              value={{
                year: dayjs(draft.date.start || new Date()).format("YYYY"),
                month: dayjs(draft.date.start || new Date()).format("MM"),
              }}
              onChange={(e) => changeDate(e)}
            />
          </div>
        )}
      </div>

      <div className="p-4 space-y-2 bg-white rounded-md">
        <p className="text-lg font-bold">상태</p>
        <Tabs
          options={STATUS_OPTIONS}
          selected={draft.status}
          onChange={(e) => changeStatus(e as EnumStatus)}
        />
      </div>

      <div className="p-4 space-y-2 bg-white rounded-md">
        <p className="text-lg font-bold">정렬</p>
        <Tabs
          options={SORT_OPTIONS}
          selected={draft.sort}
          onChange={(e) => setDraft({ ...draft, sort: e as SortTarget })}
        />
      </div>

      <div className=" [&>button]:w-full">
        <Button type="button" variant="primary" onClick={handleApply}>
          검색
        </Button>
      </div>
    </motion.div>
  );
}
