// ListContentsClient.tsx ('use client' 선언)
"use client";

import { useQuery } from "@tanstack/react-query";
import { getListRegister } from "@/app/master/(with-menu)/list/actions";
import LineItem from "@/components/list/LineItem";
import { SearchBarInput } from "@/schemas/search";
import LineItemSkeleton from "@/components/list/LIneListSkeleton";

export default function ListContentsClient({
  filters,
}: {
  filters: SearchBarInput;
}) {
  const { data: result, isPending } = useQuery({
    queryKey: ["register", "list", filters],
    queryFn: () => getListRegister(filters),
  });

  return (
    <>
      {isPending && <LineItemSkeleton count={10} />}
      <ul>
        {result?.items?.map((item) => (
          <LineItem key={item.id} {...item} page="list" />
        ))}
      </ul>
    </>
  );
}
