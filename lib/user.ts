import db from "@/lib/db";

export async function fetchUserById(id: string) {
  return await db.users.findUnique({
    where: { id },
  });

  // const res = await fetch(`/api/user/${id}`, {
  //   cache: "force-cache", // ✅ 캐싱 (기본)
  //   // cache: "no-store", // ❌ 캐싱 안함
  //   // next: { revalidate: 3600 } // ✅ ISR처럼 1시간마다 캐시 갱신
  // });
  // return res.json();
}
