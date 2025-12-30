"use client";
import Select from "@/components/forms/Select";
import { getDayList, getMonthList, getYearList } from "@/utils/helpers/date";

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
  const dateChange = (type: "year" | "month" | "day", value: string) => {
    const params = {
      year,
      month,
      day,
    };
    params[type] = value;
    onChange(params);
  };
  return (
    <div className="flex gap-1 ">
      <Select
        name="year"
        options={getYearList()}
        selected={year}
        className="flex-1"
        onChange={(e) => dateChange("year", e.target.value)}
      />

      <Select
        name="month"
        options={getMonthList()}
        selected={month}
        className="flex-1"
        onChange={(e) => dateChange("month", e.target.value)}
      />

      {day && (
        <Select
          name="day"
          options={[{ id: "all", label: "전체" }, ...getDayList()]}
          selected={day}
          className="flex-1"
          onChange={(e) => dateChange("day", e.target.value)}
        />
      )}
    </div>
  );
}
