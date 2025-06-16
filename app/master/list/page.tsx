"use client";

import fetchReceiveList, { InitialReceive } from "@/app/master/list/actions";
import Button from "@/components/forms/form-button";
import Select from "@/components/forms/form-select";
import ItemList from "@/components/ItemList";
import Tabs from "@/components/Tabs";
import { EnumStatus } from "@/lib/constants/status";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ReceiveList() {
  const [items, setItems] = useState<InitialReceive>([]);
  const [option, setOption] = useState("");
  const [statusList, setStatusList] = useState([
    "READY",
    "COMPLETED",
    // "CANCEL",
  ]);

  const statusLabels: Record<EnumStatus, string> = {
    [EnumStatus.READY]: "접수",
    [EnumStatus.COMPLETED]: "완료",
    [EnumStatus.CANCEL]: "취소",
  };

  const selectReceive = async () => {
    const result = await fetchReceiveList();
    setItems([...result]);
  };

  const changeStatus = (id: string) => {
    const statusLabel = id;

    if (statusList.includes(statusLabel)) {
      setStatusList((prev) => prev.filter((x) => x !== statusLabel));
    } else {
      setStatusList((prev) => [...prev, ...[statusLabel]]);
    }
  };

  const options = [{ id: "a", label: "2025년 6월" }];
  const onChangeOptions = (id: string) => {
    setOption(id);
  };
  useEffect(() => {
    selectReceive();
    onChangeOptions(options[0].id);
  }, []);

  return (
    <div>
      <div className="flex items-center h-20 gap-1 p-3">
        <Select value={option} options={options} />
        <Tabs
          options={Object.values(EnumStatus).map((status) => ({
            id: status,
            label: statusLabels[status],
          }))}
          selected={statusList}
          onClick={(id) => changeStatus(id)}
        />

        <div className="flex items-center justify-center border rounded-md size-12 border-slate-200">
          <Image src="/images/sort.png" alt="sort" width={20} height={20} />
        </div>
        <Button className="h-12">조회</Button>
      </div>

      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <ItemList key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
}
