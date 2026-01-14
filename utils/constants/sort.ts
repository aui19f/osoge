import { SortTarget } from "@/schemas/search";

/** 1. 단순 매핑 객체 (가장 빠름) */
export const SORT_LABELS: Record<SortTarget, string> = {
  desc: "내림차순",
  asc: "오름차순",
};

/** 2. UI 컴포넌트(Select, Dropdown)용 옵션 */
export const SORT_OPTIONS = Object.entries(SORT_LABELS).map(([id, label]) => ({
  id: id as SortTarget,
  label,
}));

/** 3. 한글 변환 함수 */
export const printSortLabel = (sort: string | SortTarget) => {
  return SORT_LABELS[sort as SortTarget] || sort;
};
