"use server";
import db from "@/lib/db";
import { registerSchema } from "@/schemas/register";
import dayjs from "dayjs";

const cache = new Map<string, number>(); // 임시 메모리 캐시

export async function registerForm(prev: unknown, formData: FormData) {
  try {
    const isAgree = Boolean(formData.get("agree") === "agree");

    //1. 동의 & 핸드폰 번호가 있따면, 손님정보가져오기

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

    //2. 가게정보를 찾기 -> Front (zstand로 가져오기)
    const storeId = formData.get("store_id");
    if (typeof storeId !== "string" || !storeId) {
      throw "상점 정보가 존재하지 않습니다.";
    }

    //3. 저장
    const today = dayjs();

    // 아이디를 만들때 사용
    // 비용 문제로
    // 초기 무료 운영단계: in-memory cache + fallback count
    // 트래픽 증가 시: Supabase KV or Upstash Redis로 이전

    const cacheKey = getCacheKey(storeId);
    let nextIndex = cache.get(cacheKey);
    if (!nextIndex) {
      const count = await db.receive.count({
        where: {
          storeId,
          created_at: {
            gte: today.startOf("day").toDate(), //오늘
            lt: today.add(1, "day").startOf("day").toDate(), // 내일
          },
        },
      });

      nextIndex = count;
    }
    nextIndex += 1;
    cache.set(cacheKey, nextIndex);

    const serialCode = `${today.format("YYMMDD")}${String(nextIndex).padStart(
      2,
      "0"
    )}`;

    const createReceive = await db.receive.create({
      data: {
        serialCode,
        phone: isAgree ? result?.data?.phone : null,
        storeId,
      },
    });
    if (!createReceive) {
      console.log("ERROR");
      throw "접수 저장 도중 에러가 발생했습니다.";
    }
    return {
      status: 200,
      message: "성공",
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: 401,
      message: "실패",
    };
  }

  // TODO
  // 1. 프린트 출력
  // 2. 접수 메시지(문자/카톡) 전송
}

function getCacheKey(storeId: string) {
  const today = new Date();
  const datePart = today.toISOString().slice(2, 10).replace(/-/g, ""); // YYMMDD
  return `${datePart}-${storeId}`;
}
