import { getShop } from "@/app/actions/getShop";
import { getUser } from "@/app/actions/getUser";
import ShopProvider from "@/components/provider/ShopProvider";
import UserProvider from "@/components/provider/UserProvider";

import { redirect } from "next/navigation";

export default async function MasterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getUser();
  const shop = await getShop();

  if (!user) {
    redirect("/");
  }

  return (
    <UserProvider user={user}>
      <ShopProvider shop={shop}>{children}</ShopProvider>
    </UserProvider>
  );
}
