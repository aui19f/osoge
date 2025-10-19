"use client";
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import { START_SERVICE_YEAR } from "@/lib/constant";
import { useMemo, useState } from "react";

export default function Search() {
  const [receiptNum, setReceiptNum] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const yearRangeArray = Array(Number(year) - START_SERVICE_YEAR + 1).fill(
    null
  );

  const options = yearRangeArray.reduce((acc, _, index) => {
    const currentYear = START_SERVICE_YEAR + index;
    const yearString = currentYear.toString();
    acc.push({ id: yearString, label: yearString });
    return acc;
  }, []);

  return (
    <div>
      <div>상태</div>
      <div className="flex gap-2">
        {options && (
          <Select
            name="year"
            selected={year}
            options={[{ id: "2025", label: "2025" }]}
            onChange={(e) => setYear(e.target.value)}
          />
        )}
        <Input
          name="receipt"
          value={receiptNum}
          onChange={(e) => setReceiptNum(e.target.value)}
        />
      </div>
      <Button>조회</Button>
    </div>
  );
}
