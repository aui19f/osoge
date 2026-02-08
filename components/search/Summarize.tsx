import { SearchBarInput } from "@/schemas/search";
import { SORT_LABELS } from "@/utils/constants/sort";
import { STATUS_LABELS } from "@/utils/constants/status";
import dayjs from "dayjs";

export default function Summarize({ type, date, sort, status }: SearchBarInput) {

  // 1. 날짜 텍스트 가독성 로직
  const getFormattedDateRange = () => {
    if (type === "all" || !date.start || !date.end) return "전체 기간";

    const start = dayjs(date.start);
    const end = dayjs(date.end);

    if (start.isSame(end, "day")) {
      return start.format("YYYY.MM.DD");
    }

    return `${start.format("YYYY.MM.DD")} ~ ${end.format("YYYY.MM.DD")}`;
  };

  return (
    <div className="flex flex-wrap items-center gap-2 py-1 text-sm text-gray-600">

      <span>
        {getFormattedDateRange()}
      </span>


      {(sort || (status && status.length > 0)) && (
        <span className="text-gray-300">|</span>
      )}


      {sort && (
        <span >{SORT_LABELS[sort]}</span>
      )}


      {status && status.length > 0 && (
        <div >
          {status.map((s) => (
            <span key={s} >
              #{STATUS_LABELS[s]}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}