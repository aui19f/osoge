export type SortOrder = "desc" | "asc";

/** 1. 단순 매핑 객체 (가장 빠름) */
export const SORT_LABELS: Record<SortOrder, string> = {
  desc: "내림차순",
  asc: "오름차순",
};

/** 2. UI 컴포넌트(Select, Dropdown)용 옵션 */
export const SORT_OPTIONS = Object.entries(SORT_LABELS).map(([id, label]) => ({
  id: id as SortOrder,
  label,
}));

/** 3. 한글 변환 함수 */
export const formatSortKo = (sort: SortOrder): string => {
  return SORT_LABELS[sort] || "정렬";
};
