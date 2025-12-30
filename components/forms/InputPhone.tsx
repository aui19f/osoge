import Input from "@/components/forms/Input";
import { changeFormatKoPhoneNumber } from "@/utils/formatter/phone";
import React, { useState, useEffect } from "react";

export default function InputPhone({
  value,
  onChange,
}: {
  value: string;
  onChange: (digits: string) => void;
}) {
  const [formatted, setFormatted] = useState(changeFormatKoPhoneNumber(value));

  // 부모에서 value가 변경될 때 포맷 반영
  useEffect(() => {
    const onlyDigits = value.replace(/\D/g, "").slice(0, 11);
    setFormatted(changeFormatKoPhoneNumber(onlyDigits));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, "").slice(0, 11);
    const formattedValue = changeFormatKoPhoneNumber(digits);
    setFormatted(formattedValue);
    onChange(digits);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    const digits = text.replace(/\D/g, "").slice(0, 11);
    setFormatted(changeFormatKoPhoneNumber(digits));
    onChange(digits);
  };

  return (
    <Input
      name="phone"
      inputMode="numeric"
      value={formatted}
      onChange={handleChange}
      onPaste={handlePaste}
      maxLength={13} // 010-0000-0000 포맷 기준 최대 13자
    />
  );
}
