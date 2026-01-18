"use client";

import ApplyDetails from "@/components/items/ApplyDetails";
import { useParams } from "next/navigation";

import ModalBase from "@/components/modal/ModalBase";

export default function ListDetail() {
  const params = useParams();
  const id = params.id;
  const itemId = Array.isArray(id) ? id[0] : id;

  return (
    <>
      {itemId && (
        <ModalBase>
          <ApplyDetails id={itemId} type="modal" />
        </ModalBase>
      )}
    </>
  );
}
