import ApplyDetails from "@/components/items/ApplyDetails";
import { use } from "react";
export default function ApplyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <div className="h-full overflow-hidden flex flex-col bg-white [&>form]:flex-1 [&>form]:flex [&>form]:flex-col">
      <ApplyDetails id={id} type="page" />
    </div>
  );
}
