"use client";
import Select from "@/components/forms/Select";
import { DateFields } from "@/types/common";
import {
  getDayList,
  getMonthList,
  getYearList,
} from "@/utils/date/select-options";

interface SelectDateProps {
  value: DateFields;
  onChange: (value: DateFields) => void;
}

export default function SelectDate({ value, onChange }: SelectDateProps) {
  const { year, month, day } = value;

  const dateChange = (type: keyof DateFields, newValue: string) => {
    onChange({
      ...value,
      [type]: newValue,
    });
  };

  return (
    <div className="flex gap-1 [&>div]:flex-1">
      <Select
        options={getYearList()}
        selected={year}
        onChange={(val) => dateChange("year", val)}
      />

      <Select
        options={getMonthList()}
        selected={month}
        onChange={(val) => dateChange("month", val)}
      />

      {day !== undefined && (
        <Select
          options={[{ id: "all", label: "전체" }, ...getDayList()]}
          selected={day}
          onChange={(val) => dateChange("day", val)}
        />
      )}
    </div>
  );
}
