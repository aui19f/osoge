import SearchBar from "@/components/search/SearchBar";
import { PageUrlProps, parseSearchParams } from "@/schemas/search";
import ListContentsClient from "@/app/master/(with-menu)/list/listContents";

export default async function ListPage({ searchParams }: PageUrlProps) {
  const params = await searchParams;
  const filters = parseSearchParams(params);

  return (
    <main>
      <SearchBar initialFilters={filters} />
      <section>
        <ListContentsClient filters={filters} />
      </section>
    </main>
  );
}
