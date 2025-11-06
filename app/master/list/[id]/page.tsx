"use client";

import ItemDetails from "@/components/modal/ItemDetails";
import { useRouter } from "next/navigation";

export default function ListModalPage() {
  const router = useRouter();
  const onClose = () => {
    //list페이지 이동
    router.push("/master/list");
  };

  return <ItemDetails onClose={onClose} />;
}
