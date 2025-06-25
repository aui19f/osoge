import { EnumRole } from "@/lib/constants/roles";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface ISessionContent {
  id?: string;
  role?: EnumRole;
}

export default async function getSession() {
  const password = process.env.COOKIE_PASSWORD;
  if (!password) {
    throw new Error("Missing COOKIE_PASSWORD environment variables.");
  }

  return getIronSession<ISessionContent>(await cookies(), {
    cookieName: "osoge",
    password,
  });
}
