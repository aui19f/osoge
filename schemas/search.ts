import { z } from "zod";
import { EnumStatus } from "@prisma/client";

export const searchBarSchema = z.object({
  type: z.enum(["day", "week", "month", "all"]),

  date: z.object({
    start: z.date().nullable(),
    end: z.date().nullable(),
  }),
  status: z.array(z.nativeEnum(EnumStatus)),
  sort: z.enum(["desc", "asc"]),
  word: z.string(),
});

export type SearchBarInput = z.infer<typeof searchBarSchema>;

export interface SearchBarInputProps {
  id?: string;
  status: EnumStatus[];
  sort: SortTarget;
  word: string;
  created_at: { get: Date | null; lte: Date | null } | undefined;
}

export const itemDetailSchema = searchBarSchema.extend({
  id: z.string(),
});

export type DateTarget = z.infer<typeof searchBarSchema>["type"];
export type SortTarget = z.infer<typeof searchBarSchema>["sort"];

// URL에서 입력받아서 스키마에 맞는 객체로
export const parseSearchParams = (params: {
  [key: string]: string | string[] | undefined;
}): SearchBarInput => {
  const defaultFilters = {
    type: (params.type as string) || "all",
    date: {
      start: params.start ? new Date(params.start as string) : null,
      end: params.end ? new Date(params.end as string) : null,
    },
    status: params.status
      ? (params.status as string).split(",").map((s) => s as EnumStatus)
      : [EnumStatus.READY],
    sort: (params.sort as string) || "desc",
    word: (params.word as string) || "",
  };
  // z.parse를 통해 타입 안정성 확보 및 기본값 적용
  return searchBarSchema.parse(defaultFilters);
};

export interface PageUrlProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
