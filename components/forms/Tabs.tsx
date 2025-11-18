import { FormOption } from "@/types/forms";

interface TapsProps<T = string[] | string> {
  options: FormOption[];
  selected: T;
  onClick: (value: FormOption) => void;
  className?: string;
}
export default function Tabs({
  options,
  selected,
  onClick,
  className = "",
}: TapsProps) {
  return (
    <ul className={`flex h-12 form-tabs ${className}`}>
      {options.map((option) => (
        <li
          className={`flex items-center justify-center flex-1 border-r border-r-gray-100 dark:border-r-gray-700 last:border-r-0 ${
            selected.includes(option.id)
              ? "font-bold bg-gray-200 dark:bg-blue-900 "
              : ""
          }`}
          key={option.id}
          onClick={() => onClick(option)}
        >
          <p
            className={`${
              selected.includes(option.id)
                ? "dark:text-gray-300 "
                : "dark:text-gray-600"
            }`}
          >
            {option.label}
          </p>
        </li>
      ))}
    </ul>
  );
}
