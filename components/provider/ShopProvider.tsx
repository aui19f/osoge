"use client";
import { IShop, useShopStore } from "@/store/useShopStore";
import { useEffect } from "react";

interface Props {
  shop: IShop | null;
  children?: React.ReactNode;
}
export default function ShopProvider({ shop, children }: Props) {
  const setShop = useShopStore((s) => s.setShop);

  useEffect(() => {
    if (shop) {
      setShop(shop);
    }
  }, [shop]);
  return <>{children}</>;
}
