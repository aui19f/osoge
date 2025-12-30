"use server";

import { getUser } from "@/app/actions/getUser";
import { SearchOption } from "@/app/admin/apply/actions";
import db from "@/lib/db";

export async function getListRegister(params: SearchOption) {
  const { type, date, status, sort, text } = params;
  try {
    const { storeIds } = await getUser();
    if (storeIds.length === 0) throw new Error("관리중인 매장이 없습니다.");

    const result = await db.receive.findMany({
      where: {
        storeId: storeIds[0],
        ...(type !== "all" && {
          created_at: {
            gte: date.start,
            lte: date.end,
          },
          status: {
            in: status,
          },
          ...(text && {
            OR: [
              {
                display_id: {
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
        }),
      },
      orderBy: {
        created_at: sort,
      },
      select: {
        id: true,
        display_id: true,
        created_at: true,
        phone: true,
        status: true,
        _count: {
          select: { comments: true }, // 댓글 개수만 효율적으로 카운트
        },
      },
    });

    return {
      status: 200,
      message: "",
      items: result.map((item) => ({
        ...item,
        name: item.display_id,
        phone: item.phone || "",
      })),
    };
  } catch (error) {
    console.log("[error]", error);
  }
}
