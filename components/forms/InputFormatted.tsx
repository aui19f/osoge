"use client";

import { FormInput, size } from "@/types/forms";

interface FormattedInputProps extends FormInput {
  /** 화면에 보여줄 때 적용할 포맷 함수 (ex: 콤마 추가, 하이픈 추가) */
  formatter: (value: string) => string;
  /** DB에 저장할 때 불필요한 문자를 제거할 정규식 (기본값: 숫자 제외 제거) */
  unformatRegex?: RegExp;
}

export default function InputFormatted({
  name,
  sizes = "md",
  onChange,
  value,
  formatter,
  unformatRegex = /[^0-9]/g,
  ...rest
}: FormattedInputProps) {
  const sizeStyle = size[sizes];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1. 입력된 값에서 포맷 특수문자 제거 (순수 데이터 추출)
    const rawValue = e.target.value.replace(unformatRegex, "");

    // 2. React Hook Form이나 부모 상태에는 순수 숫자값만 전달
    // 이 과정을 통해 DB에는 '01012345678' 형태로 깨끗하게 저장됩니다.
    e.target.value = rawValue;
    onChange?.(e);
  };

  // 3. 화면 표시용 데이터 변환
  const displayValue =
    value === "" || value === null || value === undefined
      ? ""
      : formatter(String(value));

  return (
    <input
      {...rest}
      name={name}
      type="text"
      inputMode="numeric"
      value={displayValue}
      onChange={handleChange}
      className={`border-slate-400 w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all ${sizeStyle}`}
    />
  );
}
