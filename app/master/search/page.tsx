"use client";
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Tabs from "@/components/forms/Tabs";
import ListItem from "@/components/master/ListItem";

import { FormOption } from "@/types/forms";
import { StatusOptions } from "@/types/StatusOptions";
import Link from "next/link";
import { useState } from "react";

export default function Search() {
  const [type, setType] = useState("receipt");
  const [status, setStatus] = useState<string[]>(["READY"]);
  const [receiptNum, setReceiptNum] = useState("");
  const [phone, setPhone] = useState("");

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
        <div className="flex items-center gap-2">
          <Select
            name="type"
            options={typeOptions}
            selected={type}
            onChange={(e) => setType(e.target.value)}
          />
          <div className="flex-1">
            {type === "receipt" && (
              <Input
                name="receipt"
                value={receiptNum}
                className="flex-2"
                onChange={(e) => setReceiptNum(e.target.value)}
                placeholder="접수번호"
              />
            )}

            {type === "phone" && (
              <Input
                name="phone"
                value={phone}
                placeholder="핸드폰번호"
                onChange={(e) => setPhone(e.target.value)}
              />
            )}
          </div>
          <Button variant="primary" type="button" className="w-16">
            조회
          </Button>
        </div>
      </form>
      <ul className="flex flex-col gap-2 ">
        {Array(10)
          .fill(null)
          .map((x) => (
            <li
              className="relative p-2 border border-gray-400 rounded-lg"
              key={x}
            >
              <Link href={`list/123`} scroll={false}>
                <ListItem />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
