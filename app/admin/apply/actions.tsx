"use server";

import db from "@/lib/db";
import { SortOrder } from "@/utils/constants/sort";
import { EnumStatus } from "@prisma/client";

type DateRange = { start: Date; end: Date };
type DateType = "day" | "week" | "month" | "all";

export interface SearchFilters {
  type: DateType;
  date: DateRange;
  status: EnumStatus[];
  sort: SortOrder;
}
export interface SearchOption extends SearchFilters {
  text: string;
}
export default async function getListApply(params: SearchOption) {
  const { type, date, status, sort, text } = params;

  try {
    return {
      status: 200,
      message: "",
      items: await db.apply.findMany({
        where: {
          ...(type !== "all" && {
            created_at: {
              gte: date.start,
              lte: date.end,
            },
          }),
          status: {
            in: status,
          },
          ...(text && {
            OR: [
              {
                name: {
                  contains: text,
                  mode: "insensitive",
                },
              },
              {
                phone: {
                  contains: text,
                  mode: "insensitive",
                },
              },
            ],
          }),
        },
        orderBy: {
          created_at: sort,
        },

        select: {
          id: true,
          name: true,
          created_at: true,
          phone: true,
          status: true,
          _count: {
            select: { comments: true }, // 댓글 개수만 효율적으로 카운트
          },
        },
      }),
    };
  } catch (error) {
    console.log(error);
  }
}
