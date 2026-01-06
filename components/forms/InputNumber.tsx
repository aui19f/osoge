"use client";

import { FormInput, size } from "@/types/forms";
import { formatCommaNumber } from "@/utils/formatter/number";

export default function NumberInput({
  name,
  sizes = "md",
  onChange,
  value,
  ...rest
}: FormInput) {
  const sizeStyle = size[sizes];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    // 값이 비어있으면 빈 문자열을, 아니면 숫자 문자열을 그대로 보냄
    // 여기서 e.target.value를 업데이트해야 onChange에서 올바른 값을 가져갑니다.
    e.target.value = rawValue;
    onChange?.(e);
  };

  // 숫자인 경우 formatCommaNumber 적용, 단 값이 없을 때는 빈 문자열 유지
  const displayValue =
    value === "" || value === null || value === undefined
      ? ""
      : formatCommaNumber(value as string);
  // inputMode="numeric" // 모바일에서 숫자 키보드 유도
  return (
    <input
      {...rest}
      name={name}
      type="text"
      inputMode="numeric"
      value={displayValue ?? ""}
      onChange={handleChange}
      className={`border-slate-400 w-full border p-2 rounded ${sizeStyle}`}
    />
  );
}
