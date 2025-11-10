import db from "@/lib/db";
import * as Sentry from "@sentry/nextjs";
import { Prisma } from "@prisma/client";
import { createClient } from "@/lib/supabase/server";

export type typeUsers = Prisma.PromiseReturnType<typeof getUser>;

export async function getUser() {
  const supabase = await createClient();
  try {
    console.log("==getUser 호출 ===");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No user (auth) information.");
    }

    const userDB = await db.users.findUnique({
      where: { id: user.id },
      include: {
        store: {
          select: {
            id: true, // store의 id만 가져오기
          },
        },
      },
    });
    if (!userDB) {
      throw new Error("No user (de) information.");
    }

    return userDB;
  } catch (error) {
    console.log("ERROR", error);
    Sentry.captureException(error, {
      tags: { module: "create-aacount" },
      extra: {
        formData: {},
        message: "[에러] 유저정보 불러오기",
        systemErr: error,
      },
    });

    return null;
  }
}
