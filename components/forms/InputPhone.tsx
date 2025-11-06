import React, { useRef, useState, useEffect } from "react";

// ✅ 한국 휴대폰 번호 포맷 함수 (10자리, 11자리 둘 다 지원)
function formatPhone(digits: string) {
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length <= 10)
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
}

export default function PhoneInput({
  value,
  onChange,
  placeholder = "010-0000-0000",
  maxDigits = 11,
}: {
  value: string;
  onChange: (digits: string) => void;
  placeholder?: string;
  maxDigits?: number;
}) {
  const [formatted, setFormatted] = useState(formatPhone(value));
  // const inputRef = useRef<HTMLInputElement | null>(null); -- ref={inputRef}

  // 부모에서 value가 변경될 때 포맷 반영
  useEffect(() => {
    const onlyDigits = value.replace(/\D/g, "").slice(0, maxDigits);
    setFormatted(formatPhone(onlyDigits));
  }, [value, maxDigits]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, "").slice(0, maxDigits);
    const formattedValue = formatPhone(digits);
    setFormatted(formattedValue);
    onChange(digits);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    const digits = text.replace(/\D/g, "").slice(0, maxDigits);
    setFormatted(formatPhone(digits));
    onChange(digits);
  };

  return (
    <input
      type="tel"
      inputMode="numeric"
      pattern="[0-9]*"
      placeholder={placeholder}
      value={formatted}
      onChange={handleChange}
      onPaste={handlePaste}
      maxLength={13} // 010-0000-0000 포맷 기준 최대 13자
      className="w-full px-3 py-2 text-gray-900 border rounded outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="휴대폰 번호"
    />
  );
}
