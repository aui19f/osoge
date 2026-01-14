import { DateTarget } from "@/schemas/search";

export const DATE_LABELS: Record<DateTarget, string> = {
  day: "하루",
  week: "일주일",
  month: "월별",
  all: "전체",
};

export const DATE_OPTIONS = Object.entries(DATE_LABELS).map(([id, label]) => ({
  id: id as DateTarget,
  label,
}));

export const printStatusLabel = (dateType: string | DateTarget) => {
  return DATE_LABELS[dateType as DateTarget] || dateType;
};
