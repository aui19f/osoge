import SelectDate from "@/components/forms/SelectDate";
import Tabs from "@/components/forms/Tabs";
import { DateTarget, SearchBarInput } from "@/schemas/search";
import { DateFields } from "@/types/common";
import { DATE_OPTIONS } from "@/utils/constants/date";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";

export default function DateFilter() {
  const { watch, setValue } = useFormContext<SearchBarInput>();
  const currentDateType = watch("type");
  const currentDate = watch("date");

  const onChangeDateType = (value: string) => {
    const type = value as DateTarget;
    const now = dayjs();

    const datePresets: Record<DateTarget, { start: Date | null; end: Date | null }> = {
      day: { start: now.toDate(), end: now.toDate() },
      week: { start: now.subtract(7, "day").toDate(), end: now.toDate() },
      month: { start: now.startOf("month").toDate(), end: now.endOf("month").toDate() },
      all: { start: null, end: null },
    };

    setValue("date", datePresets[type]);
    setValue("type", type);
  };

  const changeDate = ({ year, month }: DateFields) => {
    const baseDate = dayjs(`${year}-${month}-01`);
    setValue("date", {
      start: baseDate.toDate(),
      end: baseDate.endOf("month").toDate(),
    });
  };

  return (
    <div className="p-4 space-y-2 bg-white rounded-md">
      <p className="text-lg font-bold">조회기간</p>
      <Tabs
        options={DATE_OPTIONS}
        selected={currentDateType}
        onChange={onChangeDateType}
      />

      {currentDateType === "month" && (
        <SelectDate
          value={{
            year: dayjs(currentDate.start ?? undefined).format("YYYY"),
            month: dayjs(currentDate.start ?? undefined).format("MM"),
          }}
          onChange={changeDate}
        />
      )}
    </div>
  );
}