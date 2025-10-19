import { getUser } from "@/app/actions/getUser";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getUser();
  if (user?.role !== "ADMIN") {
    console.log("어드민 입장가능");
  }
  return <div>{children}</div>;
}
