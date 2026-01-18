import ListContentsClient from "@/app/admin/apply/listContents";
import SearchBar from "@/components/search/SearchBar";
import { PageUrlProps, parseSearchParams } from "@/schemas/search";

export default async function Apply({ searchParams }: PageUrlProps) {
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
