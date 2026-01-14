"use server";

import db from "@/lib/db";
import { DateTarget } from "@/types/common";
import { SortOrder } from "@/utils/constants/sort";
import { EnumStatus } from "@prisma/client";

export interface SearchFilters {
  type: DateTarget;
  date: { start: Date; end: Date };
  status: EnumStatus[];
  sort: SortOrder;
  word: string;
}

export default async function getListApply(params: SearchFilters) {
  const { type, date, status, sort, word } = params;

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
          ...(word && {
            OR: [
              {
                name: {
                  contains: word,
                  mode: "insensitive",
                },
              },
              {
                phone: {
                  contains: word,
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
