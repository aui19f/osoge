// components/forms/NumberInput.tsx
import { extractOnlyNumbers, formatCommaNumber } from "@/lib/utils/format";
import { FormInput, size } from "@/types/forms";

interface NumberInputProps extends Omit<FormInput, "onChange" | "value"> {
  value?: string | number;
  onChange: (value: string) => void; // 숫자 문자열만 전달
  maxLength?: number;
  allowDecimal?: boolean;
}

export default function NumberInput({
  name,
  value,
  onChange,
  sizes = "md",
  className = "",
  allowDecimal = false,
  ...rest
}: NumberInputProps) {
  const sizeStyle = size[sizes];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = extractOnlyNumbers(e.target.value, allowDecimal);

    onChange(rawValue);
  };

  return (
    <>
      <input
        name={name}
        value={formatCommaNumber(value || "")}
        onChange={handleChange}
        inputMode="numeric"
        {...rest}
        className={`border-gray-400 w-full ${sizeStyle} ${className}`}
      />
    </>
  );
}
