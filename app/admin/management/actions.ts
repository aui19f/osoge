//user의 모든 정보 여기서 확인

import { unstable_cache } from "next/cache";
import * as UserDB from "@/app/actions/users";

// 거의 변하지 않는 유저/상점/플랜 정보 (하루 단위 캐싱)
export const getBaseUserInfo = unstable_cache(
  async (userId: string) => {
    return await UserDB.selectMasterRole(userId);
  },
  ["user-base-info"],
  { revalidate: 86400 }
);
