import { IOption } from "@/types/options";

type optionsProps = {
  name?: string;
  options: IOption[];
  selected: string[];
  onClick?: (id: string) => void;
  className?: string;
  isrequired?: boolean;
};
export default function Tabs({
  name,
  options,
  selected,
  onClick,
  className = "",
  isrequired,
}: optionsProps) {
  return (
    <div
      className={`flex h-12 border  ${className} ${
        isrequired ? "border-red-400  " : "border-slate-200"
      } rounded-md `}
    >
      {options.map((option, index) => {
        const isLastClass = index === options.length - 1;
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
               ${isLastClass ? "rounded-r-md " : ""}
             first:rounded-l-md`}
            onClick={() => onClick?.(option.id)}
          >
            {option.label}
          </div>
        );
      })}
      <input type="hidden" value={selected} name={name} />
    </div>
  );
}
