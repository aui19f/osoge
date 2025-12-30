import { FormOption } from "@/types/common";

/**
 * 특정 범위의 숫자를 FormOption 배열로 만드는 헬퍼 함수
 */
export const createRangeOptions = (
  start: number,
  end: number,
  unit: string
): FormOption[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => {
    const value = (start + i).toString();
    return { id: value, label: `${value}${unit}` };
  });
};
