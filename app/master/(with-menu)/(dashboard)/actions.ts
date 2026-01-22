"use server"; // 반드시 최상단에 있어야 합니다.
//user의 모든 정보 여기서 확인

import { unstable_cache } from "next/cache";
import * as UserDB from "@/app/actions/users";

// 거의 변하지 않는 유저/상점/플랜 정보 (하루 단위 캐싱)
const getCachedMasterRole = (userId: string) =>
  unstable_cache(
    async () => await UserDB.selectMasterRole(userId),
    ["user-base-info", userId],
    { revalidate: 3600, tags: [`user-${userId}`] } // 1시간 캐싱
  )();

export async function getBaseUserInfo(userId: string) {
  try {
    const result = await getCachedMasterRole(userId);
    const { store, plan } = result || { plan: {}, store: [] };
    const { name = "", biz_type = "" } = store[0];

    return {
      status: 200,
      items: { ...plan, ...{ name, biz_type } },
    };
  } catch (error) {
    console.log("error", error);
    return { status: 500, items: null };
  }
}
