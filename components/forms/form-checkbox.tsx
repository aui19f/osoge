import { IOption } from "@/types/options";

type CheckboxProp = {
  name: string;
  options: IOption[];
  checked: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Checkbox({
  name,
  options,
  checked,
  onChange,
}: CheckboxProp) {
  return (
    <div>
      {options.map((option) => (
        <label key={option.id} className="flex items-center gap-2">
          <div className="relative flex items-center cursor-pointer">
            <input
              name={name}
              type="checkbox"
              value={option.id}
              className="w-6 h-6 transition-all border rounded shadow appearance-none cursor-pointer peer hover:shadow-md border-sky-600 checked:bg-sky-600 checked:border-sky-600"
              checked={checked.includes(option.id)}
              onChange={onChange}
            />
            <span className="absolute text-white transform -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </div>
          <p className="text-xl font-bold text-blue-400">{option.label}</p>
        </label>
      ))}
    </div>
  );
}
