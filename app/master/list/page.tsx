"use client";
import fetchReceiveList from "@/app/master/list/actions";
import Button from "@/components/form-button";
import Select from "@/components/form-select";
import ItemList from "@/components/item-list";
import Tabs from "@/components/tabs";
import { statusSelectOptions } from "@/lib/constants/status";
import { EnumStatus } from "@prisma/client";
import Image from "next/image";
import { useActionState, useState } from "react";

export default function List() {
  const [state, actions] = useActionState(fetchReceiveList, null);
  const [status, setStatus] = useState<EnumStatus[]>([EnumStatus.READY]);
  const [option, setOption] = useState("a");
  const options = [
    { id: "2025-06", label: "2025년 6월" },
    { id: "2025-07", label: "2025년 7월" },
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

  // const onClick = () => {
  //   console.log("1. option: ", option);
  //   console.log("1. status: ", status);
  // };

  return (
    <div>
      <form action={actions} className="flex items-center h-20 gap-1 p-3">
        <Select
          name="date"
          value={option}
          options={options}
          onChange={(val) => onChange(val)}
        />

        <Tabs
          name="status"
          options={statusSelectOptions}
          selected={status}
          onClick={(id) => changeStatus(id)}
        />

        <div className="flex items-center justify-center border rounded-md size-12 border-slate-200">
          <Image src="/images/sort.png" alt="sort" width={20} height={20} />
        </div>
        <Button type="submit" className="h-12">
          조회
        </Button>
      </form>
      <ul className="flex flex-col gap-2">
        {state?.data?.map((item) => (
          <ItemList key={item.id} {...item} />
        ))}
        {/* {items.map((item) => (
     
    ))} */}
      </ul>
    </div>
  );
}
