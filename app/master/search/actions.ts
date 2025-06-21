"use server";
import { searchByCode } from "@/app/master/search/actions/code";
import { searchByPhone } from "@/app/master/search/actions/phone";
import { ItemProps } from "@/components/item-list";

export type SearchState = {
  success: boolean;
  message: ItemProps[];
};

export type SearchParams = {
  value: string;
  startDate?: string;
  endDate?: string;
  // 필요하면 더 추가
};

type SearchType = "code" | "phone";

const strategies: Record<
  SearchType,
  (praims: SearchParams) => Promise<unknown>
> = {
  code: searchByCode,
  phone: searchByPhone,
};

export default async function SearchForm(
  _: unknown,
  formData: FormData
): Promise<SearchState> {
  const reset = formData.get("reset");
  if (reset === "true") {
    return { success: false, message: [] };
  }

  const type = formData.get("type") as "code" | "phone"; // 타입 확장
  const value = formData.get(type) as string;

  const strategy = strategies[type];

  if (!strategy) {
    throw new Error(`지원하지 않는 검색 타입: ${type}`);
  }

  const result = await strategy({ value });
  console.log("result", result);
  console.log(">>>", {
    success: true,
    message: Array.isArray(result) ? [...result] : [],
  });

  return { success: true, message: Array.isArray(result) ? [...result] : [] };
}
