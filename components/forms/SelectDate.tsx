"use client";
import Select from "@/components/forms/Select";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getDayList, getMonthList, getYearList } from "@/lib/dateOption";

interface selectDateProps {
  year: string;
  month: string;
  day?: string;

  onChange: (date: { year: string; month: string; day?: string }) => void;
}
export default function SelectDate({
  year,
  month,
  day,
  onChange,
}: selectDateProps) {
  const [inputYear, setYear] = useState(year);
  const [inputMonth, setMonth] = useState(month);
  const [inputDay, setDay] = useState(day);
  useEffect(() => {
    if (year !== inputYear || month !== inputMonth || day !== inputDay) {
      onChange({ year: inputYear, month: inputMonth, day: inputDay });
    }
  }, [inputYear, inputMonth, inputDay, onChange]);
  return (
    <div className="flex gap-1 ">
      <Select
        name="year"
        options={getYearList()}
        selected={inputYear}
        className="flex-1"
        onChange={(e) => setYear(e.target.value)}
      />

      <Select
        name="month"
        options={getMonthList()}
        selected={inputMonth}
        className="flex-1"
        onChange={(e) => setMonth(e.target.value)}
      />
      {inputDay && (
        <Select
          name="day"
          options={[...[{ id: "all", label: "전체" }], ...getDayList()]}
          selected={inputDay}
          className="flex-1"
          onChange={(e) => setDay(e.target.value)}
        />
      )}
    </div>
  );
}
