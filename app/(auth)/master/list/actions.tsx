"use server";

import { getList } from "@/app/actions/getList";
import { EnumNextStatus } from "@/lib/constants/status";
import { EnumStatus, Prisma } from "@prisma/client";
import { z } from "zod";

export type InitialReceive = Prisma.PromiseReturnType<typeof fetchReceiveList>;

const selectSchema = z.object({
  date: z.string({ required_error: "필수입력입니다." }),
  status: z.string({ required_error: "필수입력입니다." }),
});

export default async function fetchReceiveList(
  prevState: unknown,
  formData: FormData
) {
  const data = {
    date: formData.get("date"),
    status: formData.get("status"),
  };

  const result = await selectSchema.safeParseAsync(data);
  if (!result.success) {
    return {};
  }

  const enumStatuses: EnumStatus[] =
    typeof data.status === "string"
      ? data.status === ""
        ? []
        : data.status
            .replace("[", "")
            .replace("]", "")
            .replace(/"/gi, "")
            .split(",")
            .filter((x): x is EnumNextStatus => x !== undefined)
      : [];

  const listData = await getList({
    enumStatuses,
    date: data.date as string,
    skipNum: 0,
    takeNum: 10,
  });
  return {
    code: 200,
    data: [...listData],
  };
}
