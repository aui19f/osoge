"use client";

import { useQuery } from "@tanstack/react-query";

import LineItem from "@/components/list/LineItem";
import { SearchBarInput } from "@/schemas/search";

import Link from "next/link";
import { useLoadingStore } from "@/store/useLoading";

import LineItemSkeleton from "@/components/list/LIneListSkeleton";
import { getListApply } from "@/app/admin/apply/actions";

export default function ListContentsClient({
  filters,
}: {
  filters: SearchBarInput;
}) {
  const { setLoading } = useLoadingStore();
  const { data: result, isPending } = useQuery({
    queryKey: ["apply", "list", filters],
    queryFn: () => getListApply(filters),
  });

  return (
    <>
      {isPending && <LineItemSkeleton count={10} />}
      <ul>
        {result?.items?.map((item) => (
          <Link
            key={item.id}
            href={`apply/${item.id}`}
            scroll={false}
            onClick={() => setLoading(true)}
          >
            <LineItem {...item} page="apply" />
          </Link>
        ))}
      </ul>
    </>
  );
}
