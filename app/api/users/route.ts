// src/app/api/user/route.ts
import { Prisma } from "@prisma/client";
import db from "@/lib/db";
import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth/getUserFromToken";

/**
 * 유저 데이터 조회 API
 *
 * 흐름:
 * 1. Supabase 세션 확인 (무료 플랜 - 세션 확인만)
 * 2. 세션이 있으면 Prisma로 유저 데이터 조회 (1회만)
 * 3. 데이터를 클라이언트에 반환 → Zustand에 캐싱
 */
export async function GET() {
  try {
    // 1. JWT에서 기본 정보 추출 (DB 호출 0회)
    const tokenUser = await getUserFromToken();

    if (!tokenUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.users.findUnique({
      where: {
        id: tokenUser.id,
      },
      include: {
        store: {
          select: { id: true },
        },
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // 3. 데이터 반환 (중복 키 제거: DB 값을 우선 사용)
    return NextResponse.json({
      ...user,
      id: tokenUser.id,
      email: tokenUser.email,
      role: tokenUser.role,
      status: tokenUser.status,
      planId: tokenUser.planId,
    });
  } catch (error) {
    console.error("User API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export type typeDBUsers = Prisma.PromiseReturnType<typeof GET>;
/**
 * TODO
 * 유저 데이터 업데이트 API (선택사항)
 */
