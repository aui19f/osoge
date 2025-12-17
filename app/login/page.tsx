"use client";
import LoginForm from "@/app/login/actions";
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const [state, actions, isPending] = useActionState(LoginForm, null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useUserStore();
  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [router, user]);
  useEffect(() => {
    if (!state || state.status !== 200) return;
    if (!("data" in state) || !state.data?.user) return;

    const role = state.data.user.role;

    if (role === "GUEST") {
      router.replace("/");
    } else if (role === "MASTER") {
      router.replace("/master");
    } else if (role === "ADMIN") {
      router.replace("/admin");
    }
  }, [router, state]);
  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-800 bg-gray-50">
      <div className="flex flex-col items-center justify-center w-full py-12 sm:bg-white sm:shadow-xl sm:w-xl sm:rounded-xl">
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
            autoCapitalize="none"
            inputMode="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name="password"
            value={password}
            type="password"
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-sm text-red-400">{state?.message}</p>
          <Button
            type="submit"
            variant="primary"
            disabled={isPending || email.length === 0}
          >
            로그인
          </Button>
        </form>
      </div>
    </div>
  );
}
