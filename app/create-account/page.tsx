"use client";
import { CreateAccountForm } from "@/app/create-account/actions";

import Button from "@/components/forms/Button";

import Input from "@/components/forms/Input";

import Image from "next/image";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export default function Login() {
  const [state, actions] = useActionState(CreateAccountForm, null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_check, setPassword_check] = useState("");

  useEffect(() => {
    if (state?.status === 200) {
      alert(state.message);
      redirect("/login");
    }
  }, [state]);
  return (
    <div className="h-screen bg-blue-600 ">
      <div className="flex flex-col items-center justify-center w-full h-full bg-white dark:bg-black">
        <div className="flex items-end justify-center w-full mb-12 mr-4">
          <Image
            src="/images/icons/logo_main.png"
            alt="logo"
            width={72}
            height={72}
          />

          <div className="flex flex-col ">
            <h2 className="text-xl font-bold text-sky-600">OSOGE LOGIN</h2>
            <p className=" text-sky-600">
              <span className="font-bold">어서오게</span>
              <span className="text-sm"> :접수시스템</span>
            </p>
          </div>
        </div>

        <form
          action={actions}
          className="flex flex-col w-full gap-4 px-4 my-4 "
        >
          <Input
            name="email"
            value={email}
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name="password"
            value={password}
            type="password"
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            name="password_check"
            value={password_check}
            type="password"
            placeholder="비밀번호 확인"
            onChange={(e) => setPassword_check(e.target.value)}
          />

          {state?.message && (
            <p className="text-sm text-red-400">{state.message}</p>
          )}

          <Button type="submit" variant="primary">
            회원가입
          </Button>
        </form>
      </div>
    </div>
  );
}
