"use client";

import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input"; // 기존 공통 인풋
import verifyBusinessStatus from "@/lib/api/verifyBusinessStatus";
import { extractOnlyNumbers } from "@/utils/formatter/number";
import { changeBusinessNumber } from "@/utils/formatter/business";

import { useState, ChangeEvent } from "react";

export interface bizStatus {
  bizNum: string;
  bizTaxCode?: string;
}
interface bizStatusProps extends bizStatus {
  onChecked: (e: bizStatus) => void;
}

export default function BusinessInput({
  bizNum = "",

  onChecked,
}: bizStatusProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [internalValue, setInternalValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = changeBusinessNumber(e.target.value);
    setInternalValue(formatted);
  };

  const checkStatus = async () => {
    setIsLoading(true);
    const { b_no, tax_type_cd } = await verifyBusinessStatus(
      extractOnlyNumbers(internalValue)
    );

    onChecked({
      bizNum: b_no,
      bizTaxCode: tax_type_cd === "" ? "none" : tax_type_cd,
    });
    setIsLoading(false);
  };

  const resetBizInfo = () => {
    onChecked({ bizNum: "", bizTaxCode: "" });
  };

  return (
    <div className="flex gap-2 [&>input]:flex-1">
      <Input
        name="biz"
        value={internalValue}
        onChange={handleChange}
        placeholder="000-00-00000"
        maxLength={12} // 하이픈 포함 최대 길이
        disabled={isLoading || bizNum.length !== 0}
      />

      <div className="flex gap-1">
        <Button
          type="button"
          variant="secondary"
          onClick={checkStatus}
          disabled={
            isLoading || internalValue.length < 12 || bizNum.length !== 0
          }
        >
          조회
        </Button>
        <Button
          type="button"
          disabled={isLoading || bizNum.length === 0}
          onClick={() => resetBizInfo()}
        >
          다시입력
        </Button>
      </div>
    </div>
  );
}
