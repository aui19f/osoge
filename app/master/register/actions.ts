"use server";
import db from "@/lib/db";
import { registerSchema } from "@/lib/schemas/register";
import dayjs from "dayjs";
import { getUser } from "@/app/actions/getUser";

export async function registerForm(prev: unknown, formData: FormData) {
  const isAgree = Boolean(formData.get("agree") === "agree");
  let customerId = null;

  //1. 동의 & 핸드폰 번호가 있따면, 손님정보가져오기
  if (isAgree && formData.get("phone")) {
    const inputData = {
      phone: formData.get("phone"),
      isAgree,
    };

    const result = registerSchema.safeParse(inputData);
    if (!result.success) {
      return {
        status: 401,
        message: "핸드폰번호를 확인해주세요.",
      };
    }

    const customer = await db.customer.upsert({
      where: { phone: result.data.phone },
      update: {},
      create: {
        phone: result.data.phone,
      },
      select: { id: true },
    });

    customerId = customer.id;
  }

  //2. 가게정보를 찾기
  const { store } = await getUser();
  console.log(">>>", store[0].id);
  //3. 저장
  // 오늘 날짜 정보 준비
  const today = dayjs();

  // 아이디를 만들때 사용
  const count = await db.receive.count({
    where: {
      storeId: store[0].id,
      created_at: {
        gte: today.startOf("day").toDate(), //오늘
        lt: today.add(1, "day").startOf("day").toDate(), // 내일
      },
    },
  });

  // 순번을 3자리로 패딩 (예: 1 -> 001)
  const sequencePart = (count + 1).toString().padStart(2, "0");
  const finalSerialCode = `${today.format("YYMMDD")}${sequencePart}`;

  const createReceive = await db.receive.create({
    data: {
      serialCode: finalSerialCode,
      customerId,
      storeId: store[0].id,
    },
  });
  if (!createReceive) {
    console.log("ERROR");
  }
  return {
    status: 200,
    message: "성공",
  };

  // //리턴
}
