// app/master/@modal/(.)list/[id]/page.tsx 개선
"use client";

import ItemDetails from "@/components/modal/ItemDetails";
import { useRouter } from "next/navigation";

export default function ListModalPage() {
  const router = useRouter();
  // { params }: { params: { id: string } }
  // const { id } = params;
  // console.log(id);
  const onClose = () => {
    router.back();
  };

  return (
    <div className="px-4 py-2">
      <ItemDetails onClose={onClose} />
    </div>
  );
}
