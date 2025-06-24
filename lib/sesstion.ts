import { EnumRole } from "@/lib/constants/roles";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface ISessionContent {
  id?: string;
  role?: EnumRole;
}

export default async function getSession() {
  return getIronSession<ISessionContent>(await cookies(), {
    cookieName: "osoge",
    password: process.env.COOKIE_PASSWORD!,
  });
}

// const sesstion = await getSession();
// session.id = user.id;
// await session.save();

// import { getIronSession } from "iron-session";
// import { cookies } from "next/headers";
// interface ISesstionContent {
//   id?: string;
// }

// export default async function getSesstion() {
//   return getIronSession<ISesstionContent>(await cookies(), {
//     cookieName: "karrot",
//     password: process.env.COOKIE_PASSWORD!,
//   });
// }
