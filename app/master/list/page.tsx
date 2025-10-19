"use client";
import Button from "@/components/forms/Button";
import Select from "@/components/forms/Select";
import SelectDate from "@/components/forms/SelectDate";
import Sort from "@/components/forms/Sort";
import Tabs from "@/components/forms/Tabs";
import ListItem from "@/components/master/ListItem";
import { FormOption } from "@/types/forms";
import { StatusOptions } from "@/types/StatusOptions";

import { useState } from "react";

export default function List() {
  const [status, setStatus] = useState<string[]>(["READY"]);
  const [sort, setSort] = useState<"desc" | "asc">("desc");

  const changeStatus = (e: FormOption) => {
    if (status.includes(e.id)) {
      setStatus(status.filter((item) => item !== e.id));
    } else {
      setStatus([...status, e.id]);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-2 p-2 mb-2 shadow-md dark:border dark:border-gray-800">
        <div className="flex flex-col gap-1">
          <SelectDate isDay={true} />

          <div className="flex items-center gap-1">
            <Tabs
              options={StatusOptions}
              selected={status}
              className="flex-1"
              onClick={(e) => changeStatus(e)}
            />

            <Sort
              value={sort}
              isLabel={false}
              onClick={() =>
                setSort((prev) => (prev === "desc" ? "asc" : "desc"))
              }
            />

            <Button variant="primary">조회</Button>
          </div>
        </div>
      </div>
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
