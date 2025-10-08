"use client";

import { useActionState, useState } from "react";
import Button from "@/components/form-button";
import Input from "@/components/form-input";
import { Frame } from "@/components/modal/frame";
import { updateUserPassword, validatePassword } from "@/app/actions/updateUser";
import Image from "next/image";
import { updatePassword } from "@/app/(auth)/master/settings/actions";

type PasswordChangeProps = {
  onClose: () => void;
};

export default function PasswordChange({ onClose }: PasswordChangeProps) {
  const [state, actions, isPending] = useActionState(updatePassword, null);

  return (
    <Frame
      header={
        <>
          <div className="size-16">
            <Image
              src="/images/warning.png"
              width={56}
              height={56}
              alt="warning icon"
            />
          </div>
          <h3 className="text-3xl font-bold text-blue-400">비밀번호 변경</h3>
          <p className="text-blue-400">새로운 비밀번호를 입력해주세요</p>
        </>
      }
      body={
        <form action={actions} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              현재 비밀번호
            </label>
            <Input
              type="password"
              name="beforePw"
              placeholder="현재 비밀번호를 입력하세요"
              errors={[]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              새 비밀번호
            </label>
            <Input
              type="password"
              name="newPw"
              placeholder="새 비밀번호를 입력하세요"
              errors={[]}
            />
            <p className="text-xs text-gray-500">
              8글자 이상, 영문과 숫자 포함, @ 또는 _ 중 하나 포함
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              새 비밀번호 확인
            </label>
            <Input
              type="password"
              name="checkPw"
              placeholder="새 비밀번호를 다시 입력하세요"
              errors={[]}
            />
          </div>
          <Button
            variant="secondary-line"
            className="flex-1 h-12"
            onClick={onClose}
            disabled={isPending}
          >
            취소
          </Button>
          <Button type="submit" className="flex-1 h-12" disabled={isPending}>
            {isPending ? "변경 중..." : "변경하기"}
          </Button>
        </form>
      }
      footer={<></>}
    />
  );
}
