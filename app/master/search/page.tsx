"use client";

import SearchForm from "@/app/master/search/actions";
import Button from "@/components/form-button";
import Input from "@/components/form-input";
import Select from "@/components/form-select";
import ItemList from "@/components/item-list";
import ItemListSkeleton from "@/components/ItemListSkeleton";
import Alert from "@/components/modal/alert";
import Tabs from "@/components/tabs";

import React, { useActionState, useState } from "react";

const initialState = { success: false, data: [], message: "" };

export default function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const [state, actions] = useActionState(SearchForm, initialState);

  const [searchType, setSearchType] = useState("code");

  const [codeValue, setCodeValue] = useState("2025-06");

  const dateOptions = [
    { id: "25", label: "2025년" },
    // { id: "26", label: "2026" },
    // { id: "27", label: "2027" },
  ];

  const typeOptiosn = [
    { id: "phone", label: "핸드폰" },
    { id: "code", label: "접수번호" },
  ];

  const changeType = (id: string) => {
    const formData = new FormData();
    formData.set("reset", "true");

    setPhone("");
    setCode("");

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
    if (
      (searchType === "phone" && phone.replace(/ /gi, "").length === 0) ||
      (searchType === "code" && code.replace(/ /gi, "").length === 0)
    ) {
      setIsModal(true);
      return false;
    }
    formData.append("type", searchType);
    formData.append("phone", phone);
    formData.append("year", codeValue);
    formData.append("code", code);
    // useActionState에서 반환된 formAction 함수를 직접 호출
    // 이렇게 하면 폼의 input value에 직접 의존하지 않고 현재 React state를 기반으로 액션을 실행
    try {
      await setIsLoading(true);
      await actions(formData);
    } finally {
      await setIsLoading(false);
    }
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
        <div className="flex gap-2">
          {searchType === "phone" && (
            <div className="flex-1">
              <Input
                name="phone"
                value={phone}
                errors={[]}
                onChange={(e) => onChangePhone(e)}
                placeholder="핸드폰번호를 입력해주세요."
              />
            </div>
          )}
          {searchType === "code" && (
            <div className="flex flex-1 gap-2">
              <div>
                <Select
                  name="year"
                  options={dateOptions}
                  value={codeValue}
                  onChange={(id) => chnageCode(id)}
                />
              </div>
              <div className="flex-1">
                <Input
                  name="code"
                  value={code}
                  errors={[]}
                  onChange={(e) => onChangeCode(e)}
                  placeholder="접수번호를 입력해주세요."
                />
              </div>
            </div>
          )}

          <Button type="submit" className={"h-12"} disabled={isLoading}>
            검색
          </Button>
        </div>
      </form>

      <ul className="flex flex-col gap-2">
        {isLoading ? (
          <ItemListSkeleton length={5} />
        ) : (
          state?.data.map((item) => <ItemList key={item.id} {...item} />)
        )}
        {state?.message && (
          <p className="my-2 text-center text-red-400">데이터가 없습니다.</p>
        )}
      </ul>

      {isModal && (
        <Alert
          icon="warning"
          txt="핸드폰 또는 접수번호를 입력해주세요."
          btn="확인"
          onClose={() => setIsModal(false)}
        />
      )}
    </div>
  );
}
