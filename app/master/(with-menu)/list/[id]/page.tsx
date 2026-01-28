import RegisterDetails from "@/components/items/RegisterDetails";
import { use } from "react";
export default function ListDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <div className="flex flex-col w-full h-full bg-white [&>div:first-child]:rounded-none">
      <RegisterDetails id={id} type="page" />
    </div>
  );
}
