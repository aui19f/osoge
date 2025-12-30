import dayjs from "dayjs";

import { START_SERVICE_YEAR } from "@/utils/constants/date";
import { createRangeOptions } from "@/utils/helpers/common";
import { FormOption } from "@/types/common";

/**
 * 서비스 시작 연도부터 현재 연도까지의 리스트
 */
export function getYearList(): FormOption[] {
  const currentYear = dayjs().year();
  return createRangeOptions(START_SERVICE_YEAR, currentYear, "년");
}

/**
 * 1월 ~ 12월 리스트
 */
export function getMonthList(): FormOption[] {
  return createRangeOptions(1, 12, "월");
}

/**
 * 1일 ~ 31일 리스트
 */
export function getDayList(): FormOption[] {
  return createRangeOptions(1, 31, "일");
}

/**
 * 특정 시작일부터 현재까지의 'YYYY-MM' 옵션 생성
 * @param start '2024-01' 형식의 문자열
 */
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

/**
 * 특정 시작 연도부터 현재까지의 연도 옵션 생성
 */
export function getYearOptions(startYear: string | number): FormOption[] {
  const start =
    typeof startYear === "string" ? parseInt(startYear, 10) : startYear;
  const end = dayjs().year();

  return createRangeOptions(start, end, "");
}
