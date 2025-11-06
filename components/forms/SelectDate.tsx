"use client";
import Select from "@/components/forms/Select";
import { useState } from "react";
import dayjs from "dayjs";
import { getDayList, getMonthList, getYearList } from "@/lib/dateOption";

interface selectDateProps {
  selectedDate?: string;
  isDay: boolean;
}
export default function SelectDate({
  isDay = true,
  selectedDate = dayjs().format("YYYY/MM/DD"),
}: selectDateProps) {
  const [year, setYear] = useState(dayjs(selectedDate).format("YYYY"));
  const [month, setMonth] = useState(dayjs(selectedDate).format("MM"));
  const [day, setDay] = useState(dayjs(selectedDate).format("DD") && "all");

  return (
    <div className="flex gap-1 ">
      <Select
        name="year"
        options={getYearList()}
        selected={year.toString()}
        className="flex-1"
        onChange={(e) => setYear(e.target.value)}
      />
      <Select
        name="month"
        options={getMonthList()}
        selected={month.toString()}
        className="flex-1"
        onChange={(e) => setMonth(e.target.value)}
      />
      {isDay && (
        <Select
          name="day"
          options={[...[{ id: "all", label: "전체" }], ...getDayList()]}
          selected={day.toString()}
          className="flex-1"
          onChange={(e) => setDay(e.target.value)}
        />
      )}
    </div>
  );
}
