"use client";

interface CheckboxProps {
  options: { id: string; label: string }[];
  selected: string[];
  onChange: (e: string) => void;
  ref?: React.Ref<HTMLInputElement>;
}

export default function Checkbox({
  options,
  selected,
  onChange,
  ref,
}: CheckboxProps) {
  return (
    <div>
      {options.map((option) => (
        <label key={option.id} className="flex items-center gap-2">
          <div className="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              ref={ref}
              value={option.id}
              className="w-6 h-6 transition-all border rounded shadow appearance-none cursor-pointer peer hover:shadow-md border-sky-600 checked:bg-sky-600 checked:border-sky-600"
              checked={selected.includes(option.id)}
              onChange={(e) => onChange(e.target.value)}
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
          <p>{option.label}</p>
        </label>
      ))}
    </div>
  );
}
