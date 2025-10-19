import { FormSelectbox, size } from "@/types/forms";

export default function Select({
  name,
  options,
  selected,
  onChange,
  sizes = "md",
  className = "",
}: FormSelectbox) {
  const sizeStyle = size[sizes];
  return (
    <div className={`relative inline-block w-full ${className}`}>
      <select
        name={name}
        value={selected}
        className={`${sizeStyle} w-full mr-1`}
        onChange={onChange}
      >
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
