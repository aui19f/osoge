"use client";

import Select from "@/components/forms/form-select";
import { IOption } from "@/types/options";
import dayjs from "dayjs";
import { useMemo } from "react";

type DateSelectType = "year" | "month";

interface DateSelectProps {
  type: DateSelectType;
  start: string; // YYYY 또는 YYYY-MM
  value?: string;
  onChange?: (value: string) => void;
  name: string;
}

export default function DateSelect({
  type,
  start,
  value,
  onChange,
  name,
}: DateSelectProps) {
  const dateFormat = type === "year" ? "YYYY" : "YYYY-MM";

  const getOptions = (): IOption[] => {
    const now = new Date();

    const options: IOption[] = [];
    const current = new Date(start);

    if (type === "month") {
      while (current <= now) {
        options.push({
          id: dayjs(current).format(dateFormat),
          label: dayjs(current).format(dateFormat),
        });
        current.setMonth(current.getMonth() + 1);
      }
    } else {
      while (current.getFullYear() <= now.getFullYear()) {
        options.push({
          id: dayjs(current).format(dateFormat),
          label: dayjs(current).format(dateFormat),
        });
        current.setFullYear(current.getFullYear() + 1);
      }
    }

    return options;
  };

  const options = useMemo(() => getOptions(), [type, start]);

  return (
    <Select
      name={name}
      value={value || ""}
      options={options}
      onChange={onChange || (() => {})}
    />
  );
}
