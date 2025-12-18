/** master, admin 리펙토링 할때 삭제 예정 */
import db from "@/lib/db";
import * as Sentry from "@sentry/nextjs";
import { createClient } from "@/lib/supabase/server";
import { Prisma } from "@prisma/client";
import type { User as SupabaseAuthUser } from "@supabase/supabase-js";

// ✅ 캐시 타입 정의
let cachedUser: SupabaseAuthUser | null = null;
let lastFetchTime = 0;

// ✅ 1:N 관계 반영된 include 타입
export type UserWithStores = Prisma.usersGetPayload<{
  include: {
    store: {
      select: { id: true };
    };
  };
}>;

export async function getUser(): Promise<UserWithStores | null> {
  try {
    const now = Date.now();

    if (cachedUser && now - lastFetchTime < 60_000) {
      // 1분 내 캐시 사용
    } else {
      const supabase = await createClient();

      console.log("== getUser 호출 ==");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      cachedUser = user;
    }

    if (!cachedUser) {
      throw new Error("⚠️ cachedUser 없음 (auth 미로그인 상태)");
    }

    const userDB = await getDBUser(cachedUser!.id);

    if (!userDB) {
      throw new Error("⚠️ DB에서 해당 사용자 정보를 찾을 수 없습니다.");
    }

    lastFetchTime = now;
    return userDB;
  } catch (error) {
    console.error("❌ ERROR", error);
    Sentry.captureException(error, {
      tags: { module: "get-user" },
      extra: {
        message: "[에러] 유저정보 불러오기 실패",
        systemErr: error,
      },
    });

    return null;
  }
}

export const getDBUser = async (id: string): Promise<UserWithStores | null> => {
  return db.users.findUnique({
    where: { id },
    include: {
      store: {
        select: { id: true },
      },
    },
  });
};

// ✅ 반환 타입 동기화용
export type typeUsers = Prisma.PromiseReturnType<typeof getDBUser>;
