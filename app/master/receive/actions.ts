"use server";
// import db from "@/lib/db";
// import getSession from "@/lib/sesstion";
// import { EnumStatus } from "@prisma/client";
import { z } from "zod";

import validator from "validator";
import dayjs from "dayjs";
import db from "@/lib/db";
// import getSession from "@/lib/sesstion";
import { EnumStatus } from "@prisma/client";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "핸드폰 번호 형식이 올바르지 않습니다."
  );

export default async function ReceiveForm(
  prevState: unknown,
  formData: FormData
) {
  const inputData = formData.get("phone");
  const agree = formData.get("agree");

  const result = await phoneSchema.safeParseAsync(inputData);
  if (!result.success) {
    console.error("1 [ERROR] ", result.error.flatten());
    console.error("2 [ERROR] ", result.error.flatten().fieldErrors);
    return {
      success: false,
      fieldErrors: result.error.flatten(),
    };
  } else {
    console.log("올바른 번호:", result.data);
  }

  //접수번호를 가져와야함.
  const now = dayjs();
  const todayCode = now.format("YYMMDD");

  const todayStart = now.startOf("day").toDate();
  const todayEnd = now.endOf("day").toDate();
  console.log("날짜: ", todayStart, todayEnd);
  const todayCount = await db.receive.count({
    where: {
      created_at: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
  });
  const serialCode = `${todayCode}${String(todayCount + 1).padStart(2, "0")}`;
  console.log("serialCode", serialCode);
  //디비저장 아이디출력
  // const session = await getSession();
  const receive = await db.receive.create({
    data: {
      serialCode,
      phone: agree === "agree" ? result.data : "",
      status: "READY" as EnumStatus,
      usersId: "4ce3adff-a2fd-40c0-8dce-3037e5673f9b",
      //usersId: session.id!,
    },
    select: {
      id: true,
    },
  });
  console.log("receive", receive);
  return {
    success: true,
  };
}
