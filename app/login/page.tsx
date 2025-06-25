"use client";
import LoginForm from "@/app/login/actions";
import Button from "@/components/form-button";
import Input from "@/components/form-input";
import Image from "next/image";
import { useActionState } from "react";

export default function Login() {
  const [state, actions] = useActionState(LoginForm, null);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-600">
      <div className="px-4 py-12 bg-white rounded-md shadow-sm shadow-gray-50">
        <div className="flex items-end">
          <Image
            src="/images/logo_main.png"
            alt="logo"
            width={72}
            height={72}
          />
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-sky-600">OSOGE LOGIN</h2>
            <p className=" text-sky-600">
              <span className="font-bold">어서오게</span>
              <span className="text-sm"> :접수시스템</span>
            </p>
          </div>
        </div>
        <form action={actions} className="flex flex-col gap-4 my-4 w-96">
          <Input
            name="email"
            placeholder="이메일"
            errors={state?.fieldErrors?.email}
          />
          <Input name="password" placeholder="비밀번호" />
          <Button type="submit" className="h-12">
            로그인
          </Button>
        </form>
      </div>
    </div>
  );
}
