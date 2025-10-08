import { cookies } from "next/headers";
import { EnumRole } from "@/lib/constants/roles";
import { getIronSession } from "iron-session";

interface ISessionContent {
  id?: string;
  role?: EnumRole;
}

export default async function getSession() {
  const password = process.env.COOKIE_PASSWORD;
  if (!password) {
    console.error(
      `❌ Missing COOKIE_PASSWORD environment variable. -> ${password}`
    );
    throw new Error(`Missing COOKIE_PASSWORD. [${password}]`);
  }

  try {
    return getIronSession<ISessionContent>(await cookies(), {
      cookieName: "osoge",
      password,
    });
  } catch (error) {
    // 더 구체적인 에러 메시지 제공
    if (error instanceof Error && error.message.includes("next/headers")) {
      throw new Error(
        "getSession() must be called from a Server Component or Server Action. " +
          "If you're calling this from a Client Component, use a Server Action instead."
      );
    }
    throw new Error(
      "Failed to get session. This function must be called from a Server Component or Server Action."
    );
  }

  // return getIronSession<ISessionContent>(await cookies(), {
  //   cookieName: "osoge",
  //   password,
  // });
}
