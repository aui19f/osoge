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
    <div className="flex gap-1 [&>div]:flex-1">
      <Select
        options={getYearList()}
        selected={year}
        onChange={(e) => dateChange("year", e)}
      />

      <Select
        options={getMonthList()}
        selected={month}
        onChange={(e) => dateChange("month", e)}
      />

      {day && (
        <Select
          options={[{ id: "all", label: "전체" }, ...getDayList()]}
          selected={day}
          onChange={(e) => dateChange("day", e)}
        />
      )}
    </div>
  );
}
