import { FormOption } from "@/types/common";

interface TapsProps {
  options: FormOption[];
  selected?: string | string[];
  onChange: (value: string) => void;
}

export default function Tabs({ options, selected, onChange }: TapsProps) {
  // RHF 연동 여부에 따라 값과 핸들러 결정
  const currentValue = selected;
  const handleClick = (option: FormOption) => {
    onChange(option.id);
  };

  return (
    <ul className={`flex h-12 form-tabs`}>
      {options.map((option) => (
        <li
          key={option.id}
          className={`flex items-center cursor-default justify-center flex-1 border-r border-r-gray-100 dark:border-r-gray-700 last:border-r-0 ${
            currentValue?.includes(option.id)
              ? "font-bold bg-gray-200 dark:bg-blue-900 "
              : "cursor-pointer"
          }`}
          onClick={() => handleClick(option)}
        >
          {option.label}
        </li>
      ))}
    </ul>
  );
}
