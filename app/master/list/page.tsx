"use client";
import Button from "@/components/form-button";
import Select from "@/components/form-select";
import Tabs from "@/components/tabs";
import { statusSelectOptions } from "@/lib/constants/status";
import { EnumStatus } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

export default function List() {
  const [status, setStatus] = useState<EnumStatus[]>([EnumStatus.READY]);
  const [option, setOption] = useState("a");
  const options = [
    { id: "a", label: "2025년 6월" },
    { id: "b", label: "2025년 7월" },
  ];
  const onChange = (value: string) => {
    setOption(value);
  };

  const changeStatus = (id: string) => {
    // setStatus(id as EnumStatus);
    setStatus((prev) =>
      prev.includes(id as EnumStatus)
        ? prev.filter((x) => x !== (id as EnumStatus))
        : [...prev, id as EnumStatus]
    );
  };

  const onClick = () => {
    console.log("1. option: ", option);
    console.log("1. status: ", status);
  };

  return (
    <div>
      <div className="flex items-center h-20 gap-1 p-3">
        <Select
          value={option}
          options={options}
          onChange={(val) => onChange(val)}
        />

        <Tabs
          options={statusSelectOptions}
          selected={status}
          onClick={(id) => changeStatus(id)}
        />

        <div className="flex items-center justify-center border rounded-md size-12 border-slate-200">
          <Image src="/images/sort.png" alt="sort" width={20} height={20} />
        </div>
        <Button className="h-12" onClick={onClick}>
          조회
        </Button>
      </div>
      <ul className="flex flex-col gap-2">
        {/* {items.map((item) => (
      <ItemList key={item.id} {...item} />
    ))} */}
      </ul>
    </div>
  );
}
