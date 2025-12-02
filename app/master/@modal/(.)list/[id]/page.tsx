"use client";

import ItemDetails from "@/components/modal/ItemDetails";
import ModalBase from "@/components/modal/ModalBase";
import { useRouter } from "next/navigation";

export default function ListModalPage() {
  const router = useRouter();
  const onClose = () => {
    router.back();
  };

  return (
    <ModalBase>
      <ItemDetails onClose={onClose} />
    </ModalBase>
  );
}
