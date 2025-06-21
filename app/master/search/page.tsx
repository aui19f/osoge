"use client";

import SearchForm from "@/app/master/search/actions";
import Button from "@/components/form-button";
import Input from "@/components/form-input";
import Select from "@/components/form-select";
import ItemList from "@/components/item-list";
import Loading from "@/components/loading";
import Tabs from "@/components/tabs";

import React, { useActionState, useState } from "react";

const initialState = { success: false, message: [] };

export default function Search() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const [state, actions, isPending] = useActionState(SearchForm, initialState);

  const [searchType, setSearchType] = useState("code");

  const [codeValue, setCodeValue] = useState("2025-06");

  const dateOptions = [
    { id: "25", label: "2025" },
    { id: "26", label: "2026" },
    { id: "27", label: "2027" },
  ];

  const typeOptiosn = [
    { id: "phone", label: "핸드폰" },
    { id: "code", label: "접수번호" },
  ];

  const changeType = (id: string) => {
    const formData = new FormData();
    formData.set("reset", "true");
    actions(formData);
    setSearchType(id);
  };

  const chnageCode = (id: string) => {
    setCodeValue(id);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // FormData 객체를 생성하여 현재 상태 값들을 추가
    const formData = new FormData();
    formData.append("type", searchType);
    formData.append("phone", phone);
    formData.append("year", codeValue);
    formData.append("code", code);
    // useActionState에서 반환된 formAction 함수를 직접 호출
    // 이렇게 하면 폼의 input value에 직접 의존하지 않고 현재 React state를 기반으로 액션을 실행
    await actions(formData);
  };

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setCode(value);
  };

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setPhone(value);
  };

  return (
    <div className="flex flex-col gap-4 p-2 ">
      <form
        action={actions}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <Tabs
          name="type"
          options={typeOptiosn}
          selected={[searchType]}
          onClick={(id: string) => changeType(id)}
        />

        {searchType === "phone" && (
          <>
            <Input
              name="phone"
              value={phone}
              errors={[]}
              onChange={(e) => onChangePhone(e)}
            />
          </>
        )}
        {searchType === "code" && (
          <>
            <Select
              name="year"
              options={dateOptions}
              value={codeValue}
              onChange={(id) => chnageCode(id)}
            />
            <Input
              name="code"
              value={code}
              errors={[]}
              onChange={(e) => onChangeCode(e)}
            />
          </>
        )}

        <Button type="submit" className={"h-12"}>
          검색
        </Button>
      </form>

      {isPending && <Loading />}
      <ul className="flex flex-col gap-2">
        {state?.message.map((item) => (
          <ItemList key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
}
