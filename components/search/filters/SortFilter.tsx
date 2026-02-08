import Tabs from "@/components/forms/Tabs";
import { SearchBarInput, SortTarget } from "@/schemas/search"
import { SORT_OPTIONS } from "@/utils/constants/sort";
import { useFormContext } from "react-hook-form"

export default function SortFilter(){
  const {watch, setValue} = useFormContext<SearchBarInput>();
  const currentSort: SortTarget = watch("sort");
  const onChnageSort = (value: string) => {
    const sort = value as SortTarget;
    setValue("sort", sort, {shouldValidate: true})

  }
  return  <div className="p-4 space-y-2 bg-white rounded-md">
  <p className="text-lg font-bold">정렬</p>
  <Tabs
    options={SORT_OPTIONS}
    selected={currentSort}
    onChange={onChnageSort}
  />
</div> 
}