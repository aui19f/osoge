"use server";

import { EnumNextStatus } from "@/lib/constants/status";
import db from "@/lib/db";
import getSession from "@/lib/sesstion";
// import getSession from "@/lib/sesstion";
import { EnumStatus, Prisma } from "@prisma/client";
import dayjs from "dayjs";

import { z } from "zod";
export type InitialReceive = Prisma.PromiseReturnType<typeof fetchReceiveList>;

const selectSchema = z.object({
  date: z.string({ required_error: "필수입력입니다." }),
  status: z.string({ required_error: "필수입력입니다." }),
});

// const statusMap: Record<string, EnumStatus> = {
//   준비: EnumStatus.READY,
//   완료: EnumStatus.COMPLETED,
//   취소: EnumStatus.CANCEL,
// };

export default async function fetchReceiveList(
  prevState: unknown,
  formData: FormData
) {
  const session = await getSession();
  const data = {
    date: formData.get("date"),
    status: formData.get("status"),
  };

  const result = await selectSchema.safeParseAsync(data);
  if (!result.success) {
    return {};
  }
  console.log("data.status", data.status);
  const enumStatuses: EnumStatus[] =
    typeof data.status === "string"
      ? data.status === ""
        ? []
        : data.status
            .replace("[", "")
            .replace("]", "")
            .replace(/"/gi, "")
            .split(",")
            // .map((x) => statusMap[x])
            .filter((x): x is EnumNextStatus => x !== undefined)
      : [];
  console.log("enumStatuses: ", enumStatuses);
  const startDate = dayjs(data.date + "", "YYYY-MM")
    .startOf("month")
    .toDate();
  const endDate = dayjs(data.date + "", "YYYY-MM")
    .endOf("month")
    .toDate();

  //   const enumStatuses = data.status!.split(',').map((txt) => statusMap[txt])
  //   .filter((x): x is EnumStatus => x !== undefined);

  const listData = await db.receive.findMany({
    where: {
      usersId: session.id!,
      created_at: {
        gte: startDate, // Greater Than or Equal (시작일 포함)
        lte: endDate, // Less Than or Equal (마지막일 포함)
      },
      ...(enumStatuses.length > 0 && {
        status: { in: enumStatuses },
      }),
    },
    orderBy: {
      updated_at: "desc",
    },
    select: {
      id: true,
      created_at: true,
      // updated_at: true,
      status: true,
      phone: true,
      serialCode: true,
    },
  });
  return {
    code: 200,
    data: [...listData],
  };
}
