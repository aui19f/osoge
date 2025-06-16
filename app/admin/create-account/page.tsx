"use client";
import { createAccount } from "@/app/admin/create-account/actions";
import { useActionState } from "react";

export default function CreateAccont() {
  const [pending, actions] = useActionState(createAccount, null);

  return (
    <div className="">
      <form action={actions} className="flex flex-col max-w-2xl gap-4 p-4">
        <input type="text" name="email" placeholder="이메일*" />
        <input type="password" name="password" placeholder="비밀번호*" />
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호확인*"
        />

        <input type="text" placeholder="사업자명" />
        <input type="text" placeholder="사업자번호" />
        <input type="text" placeholder="주소" />
        <input type="text" placeholder="연락처" />
        <button className="bg-sky-400 text-gray-50 border-sky-400">
          회원가입완료
        </button>
      </form>
    </div>
  );
}
