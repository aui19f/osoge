"use client";

import { useParams } from "next/navigation";
import ModalBase from "@/components/modal/ModalBase";
import RegisterDetails from "@/components/items/RegisterDetails";

export default function ListDetail() {
  const params = useParams();
  const id = params.id;
  const itemId = Array.isArray(id) ? id[0] : id;

  return (
    <ModalBase>
      {itemId && <RegisterDetails id={itemId} type="modal" />}
    </ModalBase>
  );
}
