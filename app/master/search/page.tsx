"use client";
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Sort from "@/components/forms/Sort";
import Tabs from "@/components/forms/Tabs";
import ListItem from "@/components/master/ListItem";

import { FormOption } from "@/types/forms";
import { StatusOptions } from "@/types/StatusOptions";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

export default function Search() {
  const [type, setType] = useState("receipt");
  const [status, setStatus] = useState<string[]>(["READY"]);
  const [receiptNum, setReceiptNum] = useState("");
  const [phone, setPhone] = useState("");

  const [sort, setSort] = useState<"desc" | "asc">("desc");

  const [filters, setFilters] = useState({
    type,
    sort,
  });

  const {} = useQuery({
    queryKey: ["", filters],
  });

  const typeOptions = [
    { id: "receipt", label: "접수번호" },
    { id: "phone", label: "핸드폰" },
  ];
  // const changeStatus = (e: FormOption) => {
  //   if (status.includes(e.id)) {
  //     setStatus(status.filter((item) => item !== e.id));
  //   } else {
  //     setStatus([...status, e.id]);
  //   }
  // };

  // useEffect(() => {
  //   const initValue = StatusOptions.map((x) => x.id);
  //   setStatus(initValue);
  // }, []);
  return (
    <div>
      <div className="flex gap-1 p-2 mb-2 shadow-md dark:border dark:border-gray-800">
        <Select
          name="type"
          options={typeOptions}
          selected={type}
          className="w-22"
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
        <Sort
          value={sort}
          isLabel={false}
          onClick={() => setSort((prev) => (prev === "desc" ? "asc" : "desc"))}
        />
        <Button variant="primary" type="button" className="w-16" onClick={}>
          조회
        </Button>
      </div>
      {/* <ul className="flex flex-col gap-2 ">
        {Array(10)
          .fill(null)
          .map((x) => <ListItem key={x.id} ...{x}/>)}
      </ul> */}
    </div>
  );
}
