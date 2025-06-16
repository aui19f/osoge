"use client";

import LoginForm from "@/app/login/actions";
import Image from "next/image";
import { useActionState } from "react";

export default function Login() {
  const [pending, actions] = useActionState(LoginForm, null);
  const onCloseClick = () => {
    // console.log("안내메시지");
    // window.open("https://forms.gle/8DnEwinaoRtPtgZq6");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-sky-800">
      <div className="px-4 py-12 bg-white rounded-md shadow-sm shadow-gray-50">
        <div className="flex items-end">
          <Image
            src="/images/logo_main.png"
            alt="logo"
            width={72}
            height={72}
          />
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-sky-800">OSOGE LOGIN</h2>
            <p className="text-sm text-sky-800">어서오게</p>
          </div>
        </div>

        <form action={actions} className="flex flex-col gap-4 my-4 w-96">
          <input type="text" name="email" placeholder="이메일" />
          <input type="password" name="password" placeholder="비밀번호" />

          <button className="bg-sky-400 text-gray-50 border-sky-400">
            로그인
          </button>
        </form>
        <div onClick={onCloseClick}>
          {" "}
          <p className="h-0 p-0 text-right border-0 text-sky-800">
            사용 문의하기
          </p>
        </div>
      </div>
    </div>
  );
}
