import { IOption } from "@/types/options";

type optionsProps = {
  options: IOption[];
  selected: string[];
  onClick?: (id: string) => void;
};
export default function Tabs({ options, selected, onClick }: optionsProps) {
  return (
    <div className="flex h-12 border rounded-md border-slate-200">
      {options.map((option) => {
        const isSelected = selected.includes(option.id);
        return (
          <div
            key={option.id}
            className={`flex-1 cursor-pointer px-2 flex items-center justify-center h-full
            ${
              isSelected
                ? "bg-blue-400 text-blue-50"
                : "bg-slate-50 text-slate-400 "
            }
            last:border-r-0 last:rounded-r-md first:rounded-l-md`}
            onClick={() => onClick?.(option.id)}
          >
            {option.label}
          </div>
        );
      })}
    </div>
  );
}
