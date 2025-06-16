"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Confirm from "@/components/modals/confirm";
import Button from "@/components/forms/form-button";
import Input from "@/components/forms/form-Input";
import Checkbox from "@/components/forms/form-checkbox";
import ReceiveForm from "@/app/master/receive/actions";

// useFormState가 useActionState로 이름이 바뀐것 같습니다!

export default function Receive() {
  const [state, actions] = useActionState(ReceiveForm, null);
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState("");
  const [isConfirm, setIsConfig] = useState(false);

  //폼을 실제로 submit 하게 하려면 form ref를 사용하거나, JS로 수동 submit을 호출
  // Step 1: formRef 만들기
  const formRef = useRef<HTMLFormElement>(null);

  // 오늘 날짜 셋팅
  dayjs.locale("ko");
  const now = dayjs();

  const configMsg = [
    { icon: "", label: "접수번호", txt: "TEST" },
    { icon: "", label: "접수일", txt: now.format("YYYY/MM/DD") },
    { icon: "", label: "연락처", txt: phone },
  ];

  const checkedOption = [
    { id: "agree", label: "[필수] 개인정보 수집 및 이용 동의" },
  ];
  const changeIsAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgree(agree ? "" : e.target.value);
  };

  //전송
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("?????", agree);
    // //동의를 하거나, confirm를 동의 했을 경우 서버 전송

    if (agree === "agree") {
    } else {
      //confirm
    }
    setIsConfig(true);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setPhone(value);
  };

  const onClose = () => {
    console.log("onClose");
    setIsConfig(false);
  };

  const onClick = async () => {
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    await actions(formData); // ✅ 수동으로 액션 실행
    setIsConfig(false); // 모달 닫기
  };

  useEffect(() => {
    // if (state?.success) {
    //   alert("접수가 완료되었습니다.");
    //   setPhone(""); //초기화
    //   setIsAgree(true);
    // }
  }, [state]);

  return (
    <div>
      {/* Step 2: <form>에 ref 연결 */}
      <form
        ref={formRef}
        action={actions}
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-3 "
      >
        <p>접수일: {now.format("YYYY/MM/DD")}</p>
        {/*  A hh:mm */}

        <Input
          name={"phone"}
          errors={state?.formErrors.toString()}
          type={"tel"}
          maxLength={13}
          pattern={"d*"}
          placeholder="핸드폰번호를입력해주세요"
          onChange={(e) => onChangeInput(e)}
          autoFocus
        />

        <p>완료된 후 안내메시지(알림톡)을 전송합니다. </p>
        <div className="inline-flex items-center">
          <Checkbox
            name="agree"
            options={checkedOption}
            checked={[agree]}
            onChange={(e) => changeIsAgree(e)}
          />
        </div>

        <Button type="submit" className="h-12" disabled={phone.length === 0}>
          출력/접수
        </Button>
      </form>
      {isConfirm && (
        <Confirm
          title={"접수하시겠습니까?"}
          icon={"modal_registration"}
          sutmsg={
            agree === "agree"
              ? ""
              : "개11인정보 수집 및 이용에 동의하지 않으면, 완료 안내 문자가발송되지 않습니다."
          }
          textArr={configMsg}
          onClose={onClose}
          onClick={onClick}
        />
      )}
    </div>
  );
}
