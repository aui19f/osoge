"use client";
import Select from "@/components/forms/Select";
import { useState } from "react";
import dayjs from "dayjs";
import { getMonthList, getYearList } from "@/lib/dateOption";
import Input from "@/components/forms/Input";
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
  const [day, setDay] = useState(dayjs(selectedDate).format("DD"));

  return (
    <div className="flex gap-1 ">
      <Select
        name="year"
        options={getYearList()}
        selected={year.toString()}
        onChange={(e) => setYear(e.target.value)}
      />
      <Select
        name="month"
        options={getMonthList()}
        selected={month.toString()}
        onChange={(e) => setMonth(e.target.value)}
      />
      {isDay && (
        <Input
          name="day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          placeholder="일"
        />
      )}
    </div>
  );
}
