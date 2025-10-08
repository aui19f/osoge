import { getUser } from "@/app/actions/getUser";
import { redirect } from "next/navigation";

export default async function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getUser();
  if (user) {
    redirect("/master");
  }
  return <>{children}</>;
}
