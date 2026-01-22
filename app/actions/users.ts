"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";

// 로그인

// 회원가입

// 회원정보 수정

// 로그인 여부 확인

/**
 * dashboard에서 사용할 것이며, 상점명, role에 따른 활성화 작업
 * @param userId
 * @returns
 */
export async function selectMasterRole(userId: string) {
  return await db.users.findUnique({
    where: { id: userId },
    select: {
      store: {
        select: {
          name: true,
          biz_type: true,
        },
      },
      plan: {
        select: {
          id: true,
          print: true,
          register: true,
          send_message: true,
        },
      },
    },
  });
}

export type selectMasterRoleRes = Prisma.PromiseReturnType<
  typeof selectMasterRole
>;
export type selectMasterRoleItemRes = NonNullable<selectMasterRoleRes>;
