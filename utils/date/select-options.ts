// 사용자님이 작성하신 핵심 로직들로, 컴포넌트의 SelectBox 등에 주입할 { id, label } 배열을 만듭니다.

import { FormOption } from "@/types/common";
import { START_SERVICE_YEAR } from "@/utils/date/constants";
import dayjs from "dayjs";

// createRangeOptions: 범용적인 숫자 범위 옵션 생성 (내부 보조 함수)
export function createRangeOptions(
  start: number,
  end: number,
  unit: string
): FormOption[] {
  return Array.from({ length: end - start + 1 }, (_, i) => {
    const value = (start + i).toString();
    return {
      id: value.length == 1 ? `0${value}` : value,
      label: `${value}${unit}`,
    };
  });
}

// 서비스 시작 연도부터 현재 연도까지의 리스트
export function getYearList(): FormOption[] {
  const currentYear = dayjs().year();
  return createRangeOptions(START_SERVICE_YEAR, currentYear, "년");
}
// 1월 ~ 12월 리스트
export function getMonthList(): FormOption[] {
  return createRangeOptions(1, 12, "월");
}

// getDayList: 1일 ~ 31일 고정 리스트 생성
export function getDayList(): FormOption[] {
  return createRangeOptions(1, 31, "일");
}

// getMonthOptions: 특정 시작일부터 현재까지의 'YYYY-MM' 리스트 생성
// @param start '2024-01' 형식의 문자열
export function getMonthOptions(start: string): FormOption[] {
  let current = dayjs(start).startOf("month");
  const end = dayjs().startOf("month");
  const options: FormOption[] = [];

  while (current.isBefore(end) || current.isSame(end)) {
    const value = current.format("YYYY-MM");
    options.push({ id: value, label: value });
    current = current.add(1, "month");
  }

  return options;
}

// getYearOptions: 특정 연도부터 현재까지의 연도 리스트 생성
//@param start '2024-01' 형식의 문자열
export function getYearOptions(startYear: string | number): FormOption[] {
  const start =
    typeof startYear === "string" ? parseInt(startYear, 10) : startYear;
  const end = dayjs().year();

  return createRangeOptions(start, end, "");
}
