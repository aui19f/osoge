// lib/actions/user.ts
"use server";

import db from "@/lib/db";

/**
 * 특정 유저의 상세 정보와 스토어 ID를 조회합니다.
 */
export async function findUserById(userId: string) {
  try {
    const data = await db.users.findUnique({
      where: {
        id: userId,
      },
      include: {
        store: {
          select: { id: true },
        },
      },
    });

    return data;
  } catch (error) {
    console.error("❌ Failed to fetch user with store:", error);
    return null;
  }
}
