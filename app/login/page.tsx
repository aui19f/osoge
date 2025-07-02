"use client";
import LoginForm, { userInfo } from "@/app/login/actions";
import Button from "@/components/form-button";
import Input from "@/components/form-input";
import Loading from "@/components/loading";

import Image from "next/image";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(true);
  const [state, actions, isPending] = useActionState(LoginForm, null);
  const [email, setEmail] = useState("");

  const onEmailCahnge = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setEmail(value);
  };

  useEffect(() => {
    (async () => {
      const session = await userInfo();
      if (session?.id) {
        redirect("/");
      } else {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-600">
      {isPending || (isLoading && <Loading />)}
      <div className="px-4 py-12 bg-white rounded-md shadow-sm w-72 shadow-gray-50 md:w-96">
        <div className="flex items-end">
          <Image
            src="/images/logo_main.png"
            alt="logo"
            width={72}
            height={72}
          />
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-sky-600">OSOGE LOGIN</h2>
            <p className=" text-sky-600">
              <span className="font-bold">어서오게</span>
              <span className="text-sm"> :접수시스템</span>
            </p>
          </div>
        </div>

        <form action={actions} className="flex flex-col gap-4 my-4 ">
          <Input
            name="email"
            value={email}
            placeholder="이메일"
            errors={state?.fieldErrors?.email}
            onChange={(e) => onEmailCahnge(e)}
          />
          <Input name="password" type="password" placeholder="비밀번호" />
          <p className="text-sm text-red-400">{state?.fieldErrors?.password}</p>
          <Button type="submit" className="h-12">
            로그인
          </Button>
        </form>
      </div>
    </div>
  );
}
