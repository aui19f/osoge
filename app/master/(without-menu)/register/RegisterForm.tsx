"use client";
import { registerForm } from "@/app/master/(without-menu)/register/actions";
import RegisterModalGroup from "@/app/master/(without-menu)/register/RegisterModalGroup";
import Button from "@/components/forms/Button";
import Checkbox from "@/components/forms/Checkbox";
import Keypad from "@/components/keyboard/Keypad";
import PhoneInputDisplay from "@/components/keyboard/PhoneInputDisplay";
import { startTransition, useActionState, useEffect, useState } from "react";

const REGISTER_AGREE = [
  { id: "agree", label: "[필수] 개인정보 수집 및 이용동의" },
];

export default function RegisterForm() {
  const [state, actions] = useActionState(registerForm, null);

  const [phone, setPhone] = useState("010");
  const [agree, setAgree] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  //modal
  const [isConfirm, setIsConfirm] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  const handleNumberClick = (num: string) => {
    if (phone.length >= 11) return;
    setPhone((prev) => prev + num);
  };

  const handleDelete = () => setPhone((prev) => prev.slice(0, -1));

  const reset = () => {
    setPhone("010");
    setAgree([]);
    setIsConfirm(false);
    setIsAlert(false);
  };

  const handleSubmit = (formData: FormData) => {
    setIsLoading(true); // 로딩 시작 (GifLoading 표시)
    setIsConfirm(false);
    startTransition(async () => {
      formData.set("phone", phone);
      formData.set("agree", agree.toString());
      actions(formData);
    });
  };

  const agreeChange = (target: HTMLInputElement) => {
    const { checked, value } = target;

    if (checked) {
      setAgree((prev) => [...prev, value]);
    } else {
      setAgree((prev) => prev.filter((item) => item !== value));
    }
  };

  useEffect(() => {
    if (state?.status === 200) {
      setIsAlert(true);
      setIsLoading(false);
    }
  }, [state]);

  return (
    <>
      <form
        action={handleSubmit}
        className="top-0 bottom-0 left-0 right-0 z-50 flex flex-col h-screen gap-4 fixe"
      >
        <div className="p-4 mt-4">
          <PhoneInputDisplay value={phone} />
        </div>

        <Keypad
          onNumberClick={handleNumberClick}
          onDelete={handleDelete}
          onSubmit={reset}
        />

        <div>
          <Checkbox
            name="agree"
            options={REGISTER_AGREE}
            selected={agree}
            className="font-bold text-sky-600"
            onChange={(e) => agreeChange(e.target)}
          />{" "}
          <p className="mt-1 text-sm">완료된 후 안내메시지를 전송합니다.</p>
        </div>
        <div className="flex-1"></div>
        <Button
          type="button"
          variant="primary"
          disabled={phone.length < 10}
          onClick={() => setIsConfirm(true)}
        >
          접수
        </Button>
      </form>

      <RegisterModalGroup
        isConfirm={isConfirm}
        isAlert={isAlert}
        isLoading={isLoading}
        phone={phone}
        agree={agree}
        state={state?.status || 0}
        onCloseConfirm={() => setIsConfirm(false)}
        onCloseAlert={() => reset()}
        onSave={() => handleSubmit(new FormData())}
      />
    </>
  );
}
