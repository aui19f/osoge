"use client";

import { useParams } from "next/navigation";
import ItemDetails from "@/components/items/Details";
import ModalBase from "@/components/modal/ModalBase";

export default function ListDetail() {
  const params = useParams();
  const id = params.id;
  const itemId = Array.isArray(id) ? id[0] : id;

  return (
    <ModalBase>{itemId && <ItemDetails id={itemId} type="modal" />}</ModalBase>
  );
}
