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
    // 1. 캐시 또는 DB에서 데이터 가져오기
    const result = await getCachedMasterRole(userId);

    // 2. 데이터가 아예 없는 경우 (DB에 유저 정보가 없을 때)
    if (!result) {
      return {
        status: 404,
        message: "사용자 정보를 찾을 수 없습니다.",
        items: null,
      };
    }

    // 3. 안전하게 구조 분해 할당 (기본값 설정)
    const { store = [], plan = {} } = result;
    
    // store가 배열이므로 첫 번째 요소가 있는지 체크
    const firstStore = store[0] || { name: "", biz_type: "" };
    const { name, biz_type } = firstStore;

    // 4. 최종 성공 리턴 (정상적인 데이터 합치기)
    return {
      status: 200,
      items: { 
        ...plan, 
        name, 
        biz_type 
      },
    };

  } catch (error) {
    // 5. 예상치 못한 에러 발생 시 리턴
    console.error("User Info Action Error:", error);
    return { 
      status: 500, 
      message: "서버 내부 오류가 발생했습니다.", 
      items: null 
    };
  }
}