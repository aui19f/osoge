"use client";

import Button from "@/components/forms/Button";
import Checkbox from "@/components/forms/Checkbox";
import Keypad from "@/components/keyboard/Keypad";
import PhoneInputDisplay from "@/components/keyboard/PhoneInputDisplay";
import dayjs from "dayjs";
import { useState } from "react";

import "dayjs/locale/ko";

import { ModalFrame } from "@/components/modal/Frame";
import Toast from "@/components/modal/Toast";

export default function Register() {
  const [isConfirm, setIsConfirm] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [phone, setPhone] = useState("010");
  const [agree, setAgree] = useState<string[]>([]);
  dayjs.locale("ko");
  const agreeChange = (target: HTMLInputElement) => {
    const { checked, value } = target;
    if (checked) {
      setAgree((prev) => [...prev, value]);
    } else {
      setAgree((prev) => prev.filter((item) => item !== value));
    }
  };
  const options = [{ id: "agree", label: "[필수] 개인정보 수집 및 이용동의" }];

  const handleNumberClick = (num: string) => {
    if (phone.length >= 11) return;
    setPhone((prev) => prev + num);
  };

  const handleDelete = () => setPhone((prev) => prev.slice(0, -1));

  const reset = () => {
    setPhone("010");
    // if (phone.length < 10) {
    //   alert("휴대폰 번호를 모두 입력해주세요");
    //   return;
    // }
    // alert(`입력한 번호: ${phone}`);
  };

  const checkAlert = () => {
    setIsConfirm(false);
    setIsAlert(true);
    // setTimeout(() => setIsAlert(false), 3000);
  };

  const handleToastClose = () => {
    console.log("[[[[[전송]]]]]", agree, phone);
    setPhone("010");
    setAgree([]);
    setIsAlert(false);
  };

  const confirmContents = (
    <div className="p-4 bg-gray-50">
      {agree.includes("agree") ? (
        <div>
          핸드폰번호: {phone}
          <br />
          완료시 해당 번호로 안내메시지를 전송합니다.
          <span>진행하시겠습1니까?</span>
        </div>
      ) : (
        <p>
          <span className="font-bold">개인정보 수집 및 이용동의</span>에
          동의하지 않은 경우,
          <span className="p-1 font-bold text-red-400 bg-yellow-200">
            완료 메시지가 전송되지 않습니다.
          </span>
          <br />
          <br />
          진행하시겠습니까?
          <br />
          <br />
        </p>
      )}
      <div className="flex gap-2">
        <Button
          variant="light"
          className="flex-1"
          onClick={() => setIsConfirm(false)}
        >
          취소
        </Button>
        <Button variant="primary" className="flex-1" onClick={checkAlert}>
          접수
        </Button>
      </div>
    </div>
  );

  return (
    <article className="top-0 bottom-0 left-0 right-0 z-50 flex flex-col h-screen gap-4 p-4 fixe">
      <p className="text-xl font-bold">
        {dayjs().format("YYYY년 M월 D일 dddd")}
      </p>

      <div className="p-4 border border-gray-200 shadow-md">
        <PhoneInputDisplay value={phone} />
      </div>
      <Keypad
        onNumberClick={handleNumberClick}
        onDelete={handleDelete}
        onSubmit={reset}
      />
      <div className="flex-1"></div>
      <div>
        <Checkbox
          name="agree"
          options={options}
          selected={agree}
          className="font-bold text-sky-600"
          onChange={(e) => agreeChange(e.target)}
        />
        <p className="mt-1 text-sm">완료된 후 안내메시지를 전송합니다.</p>
      </div>

      <Button
        variant="primary"
        isDisabled={phone.length < 10}
        onClick={() => setIsConfirm(true)}
      >
        접수
      </Button>

      {isConfirm && (
        <ModalFrame
          title={"(접수번호)"}
          body={confirmContents}
          onClose={() => setIsConfirm(false)}
        />
      )}

      {isAlert && (
        <Toast message="접수가 완료되었습니다." onClose={handleToastClose} />
      )}
    </article>
  );
}
