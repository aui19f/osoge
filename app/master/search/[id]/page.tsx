"use client";

import ItemDetails from "@/components/modal/ItemDetails";
import { useRouter } from "next/navigation";

export default function SearchModalPage() {
  const router = useRouter();
  const onClose = () => {
    //list페이지 이동
    router.push("/master/search");
  };

  return <ItemDetails onClose={onClose} />;
}
