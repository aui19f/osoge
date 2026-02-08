
import Mgmt from "@/components/list/Mgmt";
import SearchBar from "@/components/search/SearchBar";
import { PageUrlProps, parseSearchParams } from "@/schemas/search";

export default async function Management({ searchParams }: PageUrlProps) {
  const params = await searchParams;
  const filters = parseSearchParams(params);
  return (
    <main>
      <SearchBar initialFilters={filters} />
      <section>
        <ul className="grid gap-3 p-4">
          <Mgmt />
        </ul>
      </section>
    </main>
  );
}