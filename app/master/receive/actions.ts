"use server";
import db from "@/lib/db";
import getSession from "@/lib/sesstion";
import { EnumStatus } from "@prisma/client";
import { z } from "zod";

import validator from "validator";

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
  const isAgree = formData.get("agree");

  console.log("inputData", inputData, "isAgree", isAgree);

  const result = await phoneSchema.safeParseAsync(inputData);
  if (!result.success) {
    console.error("[ERROR] ", result.error.flatten());
    return result.error.flatten();
  } else {
    console.log("올바른 번호:", result.data);
  }

  //디비저장 아이디출력
  const session = await getSession();
  const receive = await db.receive.create({
    data: {
      phone: String(inputData),
      status: EnumStatus.READY,
      usersId: session.id!,
    },
    select: {
      id: true,
    },
  });
  console.log("[[[[[receive]]]]]", receive);
  return { success: true };
}
