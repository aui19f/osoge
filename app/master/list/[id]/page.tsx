"use client";

import ItemDetails from "@/components/modal/ItemDetails";
import { useRouter } from "next/navigation";

export default function ListModalPage() {
  const router = useRouter();
  const onClose = () => {
    router.push("/master/list");
  };

  return (
    <div className="h-full p-4 bg-white">
      <div className="flex flex-col h-full border border-gray-200 rounded-md ">
        <ItemDetails onClose={onClose} />
      </div>
    </div>
  );
}
