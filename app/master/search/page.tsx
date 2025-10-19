"use client";
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Tabs from "@/components/forms/Tabs";
import ListItem from "@/components/master/ListItem";

import { getYearList } from "@/lib/dateOption";
import { FormOption } from "@/types/forms";
import { StatusOptions } from "@/types/StatusOptions";
import { useState } from "react";

export default function Search() {
  const [type, setType] = useState("receipt");
  const [status, setStatus] = useState<string[]>(["READY"]);
  const [receiptNum, setReceiptNum] = useState("");
  const [phone, setPhone] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const typeOptions = [
    { id: "receipt", label: "접수번호" },
    { id: "phone", label: "핸드폰" },
  ];
  const changeStatus = (e: FormOption) => {
    if (status.includes(e.id)) {
      setStatus(status.filter((item) => item !== e.id));
    } else {
      setStatus([...status, e.id]);
    }
  };

  // useEffect(() => {
  //   const initValue = StatusOptions.map((x) => x.id);
  //   setStatus(initValue);
  // }, []);
  return (
    <div>
      <form className="flex flex-col gap-1 p-2 mb-2 shadow-md dark:border dark:border-gray-800">
        <Tabs
          options={typeOptions}
          selected={type}
          onClick={(e) => setType(e.id)}
        />
        {type === "receipt" && (
          <div className="flex gap-2">
            <Select
              name="startYear"
              options={getYearList()}
              selected={year.toString()}
              className="flex-1"
              onChange={(e) => setYear(e.target.value)}
            />

            <Input
              name="receipt"
              value={receiptNum}
              className="flex-2"
              onChange={(e) => setReceiptNum(e.target.value)}
              placeholder="접수번호"
            />
          </div>
        )}

        {type === "phone" && (
          <Input
            name="phone"
            value={phone}
            placeholder="핸드폰번호"
            onChange={(e) => setPhone(e.target.value)}
          />
        )}
        <Tabs
          options={StatusOptions}
          selected={status}
          onClick={(e) => changeStatus(e)}
        />
        <Button variant="primary" type="button">
          조회
        </Button>
      </form>
      <ul className="flex flex-col gap-2 ">
        {Array(10)
          .fill(null)
          .map((x) => (
            <ListItem key={x} />
          ))}
      </ul>
    </div>
  );
}
