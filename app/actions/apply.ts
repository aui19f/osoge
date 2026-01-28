"use server";

import { ensureAuth } from "@/app/actions/auth";
import { prisma } from "@/lib/prisma";

import { ApplyInput } from "@/schemas/apply";
import { SearchBarInputProps } from "@/schemas/search";
import { EnumStatus, Prisma } from "@prisma/client";

export async function createApply(params: ApplyInput) {
  const { name, phone, company, memo, biz_num, biz_num_status } = params;
  return await prisma.apply.create({
    data: {
      name,
      phone,
      biz_name: company,
      memo,
      biz_num,
      biz_num_status,
    },
  });
}

export async function selectListApply({
  status,
  sort,
  word,
  created_at,
}: SearchBarInputProps) {
  return await prisma.apply.findMany({
    where: {
      ...(created_at && created_at.gte && created_at.lte && { ...created_at }),
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
          {
            biz_name: {
              contains: word,
              mode: "insensitive",
            },
          },
          {
            biz_num: {
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
        select: {
          apply_histories: true,
        },
      },
    },
  });
}

export async function selectApplyById(id: string) {
  return await prisma.apply.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      created_at: true,
      phone: true,
      biz_name: true,
      biz_num: true,
      status: true,
      memo: true,
      apply_histories: {
        orderBy: { created_at: "desc" },
        select: {
          admin_id: true,
          status: true,
          content: true,
          created_at: true,
        },
      },
    },
  });
}

// 이 select 결과가 곧 나의 DTO 타입이 된다!

export type selectApplyByIdRes = Prisma.PromiseReturnType<
  typeof selectApplyById
>;
export type selectApplyByIdItemRes = NonNullable<selectApplyByIdRes>;

export interface createApplyHistoryProps {
  id: string;
  status: EnumStatus;
  memo: string;
}
export async function updateApply(id: string, status: EnumStatus) {
  return await prisma.apply.update({
    where: { id },
    data: { status },
  });
}
export async function insertApplyHistory(params: createApplyHistoryProps) {
  const { id, status, memo } = params;
  const {
    user: { email = "" },
  } = await ensureAuth();

  return await prisma.apply_history.create({
    data: {
      admin_id: email,
      admin_nickname: email.split("@")[0],
      apply_id: id,
      status,
      content: memo,
    },
  });
}
