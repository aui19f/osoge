"use client";

import { UserFromToken } from "@/lib/auth/getUserFromToken";
import db from "@/lib/db";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

export function AuthProvider({
  initialUser,
}: {
  initialUser: UserFromToken; // 서버에서 전달받은 초기 사용자 정보
}) {
  const id = initialUser?.id;
  const {
    user: userData,
    isLoaded,
    isLoading,
    setUser,
    setLoading,
    setError,
  } = useUserStore();

  useEffect(() => {
    console.log("AuthProvider");
    /**
     * 데이터 로딩 함수
     * DB 호출은 딱 1회만 발생
     */
    async function loadUserData() {
      // 로딩 조건 체크
      if (!id) return; // 로그인 안함
      if (isLoaded) return; // 이미 로드됨
      if (isLoading) return; // 현재 로딩 중
      if (userData?.id === id) return; // 같은 사용자의 데이터가 이미 있음

      try {
        setLoading(true);
        console.log("📥 Loading user data from DB...");

        // ✅ DB 조회 (1회만 실행)
        const data = await db.users.findUnique({
          where: {
            id,
          },
          include: {
            store: {
              select: { id: true },
            },
          },
        });

        if (!data) {
          throw "디비데이터없음";
        }

        if (data) {
          console.log("✅ User data loaded successfully");
          setUser(data);
        } else {
          throw new Error("User data not found");
        }
      } catch (error) {
        console.error("❌ Failed to load user data:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load user data"
        );
      }
    }

    loadUserData();
  }, [id, isLoaded, isLoading, userData?.id, setUser, setLoading, setError]);
  return <></>;
}
