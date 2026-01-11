"use client";
import { startTransition, useActionState, useEffect } from "react";
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import { useForm } from "react-hook-form";
import loginAction from "@/app/login/actions";
import { LoginInput, loginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const [state, actions, isPending] = useActionState(loginAction, null);

  const { register, handleSubmit, setFocus } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched", // 성능: 불필요한 리렌더링 방지를 위해 터치 시에만 검증
  });

  const onSubmit = (data: LoginInput) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    startTransition(() => {
      actions(formData);
    });
  };
  useEffect(() => {
    if (state && state.status !== 200) {
      setFocus("email");
    }
  }, [state, setFocus]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full gap-4 px-4 my-4 "
    >
      <Input
        {...register("email")}
        placeholder="이메일"
        autoCapitalize="none"
        inputMode="email"
      />
      <Input {...register("password")} type="password" placeholder="비밀번호" />
      <p className="text-sm text-red-400">{state?.message}</p>

      <Button type="submit" variant="primary" disabled={isPending}>
        {isPending ? "로그인 중..." : "로그인"}
      </Button>
    </form>
  );
}
