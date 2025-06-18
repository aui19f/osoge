"use client";
import Button from "@/components/form-button";
import Checkbox from "@/components/form-checkbox";
import Input from "@/components/form-input";
import Confirm from "@/components/modal/confirm";
import dayjs from "dayjs";
import React, { useState } from "react";

export default function Receive() {
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState("");
  const [isModel, setIsModal] = useState(false);
  // 오늘 날짜 셋팅
  dayjs.locale("ko");

  const checkedOption = [
    { id: "agree", label: "[필수] 개인정보 수집 및 이용 동의" },
  ];

  const configMsg = [
    { id: "number", icon: "", label: "접수번호", txt: "TEST" },
    {
      id: "date",
      icon: "",
      label: "접수일",
      txt: dayjs().format("YYYY/MM/DD"),
    },
    { id: "phone", icon: "", label: "연락처", txt: phone },
  ];

  const changeAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgree(agree ? "" : e.target.value);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setPhone(value);
  };

  //전송
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("MODAL OPEN");
    if (agree === "agree") {
    } else {
    }
    setIsModal(true);
  };

  const onClose = () => {
    setIsModal(false);
  };

  const onClick = () => {
    //todo
    //1. 출력
    //2. 디비 저장
    console.log("OK");
  };

  return (
    <div>
      <form
        action=""
        className="flex flex-col gap-3 p-3 "
        onSubmit={handleSubmit}
      >
        <p>접수일: {dayjs().format("YYYY/MM/DD")}</p>
        {/*  A hh:mm */}

        <Input
          name={"phone"}
          type={"tel"}
          maxLength={13}
          pattern={"d*"}
          placeholder="핸드폰번호를입력해주세요"
          onChange={(e) => onChangeInput(e)}
          autoFocus
        />
        {/* errors={state?.formErrors.toString()} */}

        <p>완료된 후 안내메시지(알림톡)을 전송합니다. </p>
        <div className="inline-flex items-center">
          <Checkbox
            name="agree"
            options={checkedOption}
            checked={[agree]}
            onChange={(e) => changeAgree(e)}
          />
        </div>

        <Button type="submit" className="h-12" disabled={phone.length === 0}>
          출력/접수
        </Button>
      </form>
      {isModel && (
        <Confirm
          title={"접수하시겠습니까?"}
          icon={"modal_registration"}
          sutmsg={
            agree === "agree"
              ? ""
              : "개인정보 수집 및 이용에 동의하지 않으면, 완료 안내 문자가발송되지 않습니다."
          }
          textArr={configMsg}
          onClose={onClose}
          onClick={onClick}
        />
      )}
    </div>
  );
}
