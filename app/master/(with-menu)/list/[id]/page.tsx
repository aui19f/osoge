import RegisterDetails from "@/components/items/RegisterDetails";
import { use } from "react";
export default function ListDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <div className="h-full bg-white ">
      <RegisterDetails id={id} type="page" />
    </div>
  );
}
