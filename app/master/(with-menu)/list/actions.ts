"use server";

// import { getUser } from "@/app/actions/getUser";

import { updateReceiptSchema } from "@/schemas/register";
import { SearchBarInput, searchBarSchema } from "@/schemas/search";
import { logError } from "@/utils/logger";
import * as RegisterDB from "@/app/actions/register";
import dayjs from "dayjs";
import { STATUS_INIT_COUNT } from "@/utils/constants/status";
import { unstable_cache } from "next/cache";

// import { ensureAuth } from "@/app/actions/auth";

export async function getListRegister(params: SearchBarInput) {
  
  try {

    const formattedData = {
      ...params,
  date: {
    start: params.date.start ? new Date(params.date.start) : null,
    end: params.date.end ? new Date(params.date.end) : null,
  },
  
};



    const validatedParams = await searchBarSchema.parseAsync(formattedData);
    
    const { type, date, status, sort, word } = validatedParams;
    
    
    const created_at =
      type === "all"
        ? undefined
        : {
            gte: date.start,
            lte: date.end,
          };

    // const { storeIds } = await getUser();
    // if (storeIds.length === 0) throw new Error("관리중인 매장이 없습니다.");
    // const {
    //   user: {
    //     app_metadata: { storeIds },
    //   },
    // } = await ensureAuth();

    // if (storeIds[0].length === 0) throw new Error("관리중인 매장이 없습니다.");

    const items = await RegisterDB.selectListRegister({
      id: "9e97b969-ff73-4f5d-89e7-b357a38e5da2",
      status,
      sort,
      word,
      created_at,
    });
   
    return {
      status: 200,
      message: "",

      items: items.map((item) => ({
        ...item,
        name: item.display_id,
        phone: item.phone || "",
      })),
    };
  } catch (error) {
        logError(error, {
      module: "Item List",
      message: "아이템 리스트 조회 에러",
      extra: {
        formData: { params },
        systemErr: error,
      },
    });
    return {
      status: 500,
      message: error instanceof Error ? error.message : "알 수 없는 에러 발생",
      items: []
    };
  }
}

export async function getRegisterById(id: string) {
  if (!id) {
    return { status: 401, message: "아이디를 확인해주세요.", items: null };
  }
  try {
    return {
      status: 200,
      message: "완료",
      items: RegisterDB.selectRegisterById(id),
    };
  } catch (error) {
    logError(error, {
      module: "Item Details",
      message: "아이템 디테일 에러",
      extra: {
        formData: { id },
        systemErr: error,
      },
    });
  }
}

export async function setRegister(prevState: unknown, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());

  try {
    const validatedFields = updateReceiptSchema.safeParse({
      ...rawData,
    });

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    if (validatedFields.data.saveType === "send") {
      console.log("전송");
    }
    // 디비 업데이트
    await RegisterDB.updateRegister({
      ...validatedFields.data,
    });

    return {
      status: 200,
      message:
        validatedFields.data.saveType === "send" ? "전송되었습니다." : "저장되었습니다.",
    };
  } catch (error) {
    logError(error, {
      module: "Item Detail Update",
      message: "접수 수정 중 에러 발생",
      extra: {
        formData: { ...rawData },
        systemErr: error,
      },
    });

    return {
      status: 401,
      message: "수정중 에러가 발생했습니다.",
      error,
    };
  }
}

// 어제까지의 3개월 통계 (하루 단위 캐싱)
export const getThreeMonthStats = async (storeId: string) => {
  // 1. 캐시 래퍼를 함수 내부에서 정의 (storeId를 키에 포함하기 위함)
  const getCachedData = unstable_cache(
    async (sId: string) => {
      const endDate = dayjs().subtract(1, "day").endOf("day").toDate();
      const startDate = dayjs().subtract(3, "month").startOf("day").toDate();

      const stats = await RegisterDB.selectThreeMonthStats({
        storeId: sId,
        startDate,
        endDate,
      });

      // 2. 초기값 복사 (매우 중요: STATUS_INIT_COUNT의 원본 보존)
      const formattedStats = stats.reduce((acc, curr) => {
        acc[curr.status] = curr._count._all;
        return acc;
      }, { ...STATUS_INIT_COUNT }); // Shallow copy로 원본 오염 방지

      return formattedStats;
    },
    ["three-month-stats", storeId], // 3. 캐시 키에 storeId 반드시 포함
    {
      revalidate: 86400,
      tags: ["stats", `stats-${storeId}`], // 4. 특정 상점 태그 추가
    }
  );

  try {
    const data = await getCachedData(storeId);
    return {
      status: 200,
      message: "통계 조회가 완료되었습니다.",
      items: data,
    };
  } catch (error) {
    console.error("Stats Error:", error);
    return { status: 500, message: "통계 오류", items: null };
  }
};

export async function getTodayHourlyStats(storeId: string) {
  const now = dayjs();
  const startDate = now.startOf("day").toDate();
  const endDate = now.endOf("day").toDate();

  try {
    return {
      status: 200,
      message: "",
      items: await RegisterDB.selectTodayRegisterCount({
        storeId,
        startDate,
        endDate,
      }),
    };
  } catch (error) {
    logError(error, {
      module: "master/page.tsx ",
      message: "오늘하루 통계조회중 에러",
      extra: {
        formData: {},
        systemErr: error,
      },
    });
    return {
      status: 401,
      message: "다시 시도해주시기 바랍니다.",
      items: 0,
    };
  }
}
