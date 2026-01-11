import SearchBar from "@/components/search/SearchBar";
import LineItem from "@/components/list/LineItem";
import { getListRegister } from "@/app/master/(with-menu)/list/actions";
import { SearchBarInput, searchBarSchema } from "@/schemas/search";
import { EnumStatus } from "@prisma/client";
import { Suspense } from "react";
import LineItemSkeleton from "@/components/list/LIneListSkeleton";

export interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

// 데이터를 직접 가져오는 컴포넌트 분리
async function ListContents({ filters }: { filters: SearchBarInput }) {
  const result = await getListRegister(filters);
  return (
    <ul>
      {result?.items?.map((item) => (
        <LineItem key={item.id} {...item} page="list" />
      ))}
    </ul>
  );
}

export default async function ListPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const defaultFilters = {
    type: (params.type as string) || "all",
    date: {
      start: params.start ? new Date(params.start as string) : null,
      end: params.end ? new Date(params.end as string) : null,
    },
    status: params.status
      ? (params.status as string).split(",").map((s) => s as EnumStatus)
      : [EnumStatus.READY],
    sort: (params.sort as string) || "desc",
    word: (params.word as string) || "",
  };

  const filters = searchBarSchema.parse(defaultFilters);

  return (
    <main>
      <SearchBar initialFilters={filters} />
      <section>
        <Suspense fallback={<LineItemSkeleton count={10} />}>
          <ListContents filters={filters} />
        </Suspense>
      </section>
    </main>
  );
}
