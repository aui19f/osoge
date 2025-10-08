"use client";
import ReceiveForm from "@/app/(auth)/master/receive/actions";
import Button from "@/components/form-button";
import Checkbox from "@/components/form-checkbox";
import Input from "@/components/form-input";
import Loading from "@/components/loading";
import Complete from "@/components/modal/complete";
import Confirm from "@/components/modal/confirm";
import dayjs from "dayjs";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";

export default function Receive() {
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const [state, actions, isPending] = useActionState(ReceiveForm, null);

  const formRef = useRef<HTMLFormElement>(null);

  // 오늘 날짜 셋팅
  dayjs.locale("ko");

  const checkedOption = [
    { id: "agree", label: "[필수] 개인정보 수집 및 이용 동의" },
  ];

  const configMsg = [
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
    if (agree === "agree") {
    } else {
    }
    setIsConfirm(true);
  };

  const closeModal = () => {
    setPhone("");
    setAgree("");
    setIsModal(false);
  };

  const onClick = async () => {
    startTransition(() => {
      const form = formRef.current;
      if (!form) return;

      const formData = new FormData(form);
      actions(formData); // ✅ now allowed
      setIsConfirm(false); // 모달 닫기
    });
  };

  useEffect(() => {
    if (state?.success) {
      // 모달추가
      setIsModal(true);
    }
  }, [state]);

  return (
    <div>
      {isPending && <Loading />}
      <form
        ref={formRef}
        className="flex flex-col gap-3 p-3 "
        onSubmit={handleSubmit}
      >
        <p>접수일: {dayjs().format("YYYY/MM/DD")}</p>
        {/*  A hh:mm */}

        <Input
          name="phone"
          value={phone}
          errors={state?.fieldErrors?.formErrors}
          type="tel"
          maxLength={13}
          pattern="[0-9]*"
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
            onChange={(e) => changeAgree(e)}
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
              : "개인정보 수집 및 이용에 동의하지 않으면, 완료 안내 문자가발송되지 않습니다."
          }
          textArr={configMsg}
          onClose={() => setIsConfirm(false)}
          onClick={onClick}
        />
      )}

      {isModal && (
        <Complete
          title={`접수번호 ${state?.data?.serialCode}`}
          txt={
            agree === "agree"
              ? `완료된 후 작성해주신 번호로 알림톡이 전송됩니다.`
              : `수선은 3~7일정도 소요됩니다.`
          }
          onClose={closeModal}
        />
      )}
    </div>
  );
}
