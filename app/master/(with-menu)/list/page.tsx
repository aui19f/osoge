import SearchBar from "@/components/search/SearchBar";
import { searchBarSchema } from "@/schemas/search";
import { EnumStatus } from "@prisma/client";
import ListContentsClient from "@/app/master/(with-menu)/list/listContents";

export interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
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
        <ListContentsClient filters={filters} />
      </section>
    </main>
  );
}
