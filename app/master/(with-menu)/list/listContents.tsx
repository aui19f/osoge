"use client";

import { useQuery } from "@tanstack/react-query";
import { getListRegister } from "@/app/master/(with-menu)/list/actions";
import LineItem from "@/components/list/LineItem";
import { SearchBarInput } from "@/schemas/search";
import LineItemSkeleton from "@/components/list/LIneListSkeleton";
import Link from "next/link";
import { useLoadingStore } from "@/store/useLoading";

export default function ListContentsClient({
  filters,
}: {
  filters: SearchBarInput;
}) {
  const { setLoading } = useLoadingStore();
  const { data: result, isPending } = useQuery({
    queryKey: ["register", "list", filters],
    queryFn: () => getListRegister(filters),
  });

  return (
    <>
      {isPending && <LineItemSkeleton count={10} />}
      <ul>
        {result?.items?.map((item) => (
          <Link
            key={item.id}
            href={`list/${item.id}`}
            scroll={false}
            onClick={() => setLoading(true)}
          >
            <LineItem {...item} page="list" />
          </Link>
        ))}
      </ul>
    </>
  );
}
