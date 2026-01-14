import ItemDetails from "@/components/items/Details";
import { use } from "react";
export default function ListDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <div className="h-full bg-white">
      <ItemDetails id={id} type="page" />
    </div>
  );
}
