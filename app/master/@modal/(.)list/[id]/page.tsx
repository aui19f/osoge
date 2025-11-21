// app/master/@modal/(.)list/[id]/page.tsx 개선
"use client";
import { ModalFrame } from "@/components/modal/Frame";
import ItemDetails from "@/components/modal/ItemDetails";
import { useRouter } from "next/navigation";

export default function ListModalPage() {
  //{ params }: { params: { id: string } }
  const router = useRouter();

  // const { id } = params;
  // console.log(id);
  const onClose = () => {
    router.back();
  };
  const bodyContents = (
    <div className="px-4 py-2">
      <ItemDetails onClose={onClose} />
    </div>
  );
  return <ModalFrame onClose={() => router.back()}>{bodyContents}</ModalFrame>;
}
