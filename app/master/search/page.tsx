"use client";

import Button from "@/components/forms/form-button";
import Input from "@/components/forms/form-Input";
import Tabs from "@/components/Tabs";
/// 1. 접수번호로 검색
// 2. 핸드폰번호로 검색
// 3. 날짜로 검색 (시작~끝)

import React, { useState } from "react";

export default function Search() {
  const [searchType, setSearchType] = useState("number");
  const [value, setValue] = useState("");

  const typeOptiosn = [
    { id: "phone", label: "핸드폰" },
    { id: "number", label: "접수번호" },
    { id: "date", label: "기간" },
  ];
  const changeType = (id: string) => {
    setValue("");
    setSearchType(id);
  };
  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setValue(value);
  };
  const onClick = () => {
    console.log(value);
  };
  return (
    <div className="flex flex-col gap-4 p-2 ">
      <Tabs
        options={typeOptiosn}
        selected={[searchType]}
        onClick={(id: string) => changeType(id)}
      />

      {searchType !== "date" && (
        <div>
          <Input
            type="tel"
            name="phone"
            errors={[]}
            placeholder="입력해주세요."
          />
        </div>
      )}

      <Button className={"h-12"}>검색</Button>

      <ul className="flex flex-col gap-2">
        {/* {items.map((item) => (
                <ItemList key={item.id} {...item} />
              ))} */}
      </ul>
    </div>
  );
}
