import { z } from "zod";

// ✅ 공통 필드 정의
export const emailSchema = z
  .string()
  .min(1, "이메일을 입력해주세요.")
  .email("올바른 이메일 형식이 아닙니다.");

export const passwordSchema = z
  .string()
  .min(6, "비밀번호는 최소 6자리 이상이어야 합니다.");

// ✅ 로그인용 스키마
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// ✅ 회원가입용 스키마 (확장)
export const signupSchema = loginSchema
  .extend({
    confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

// ✅ 타입 내보내기 (form type 용도)
export type LoginSchema = z.infer<typeof loginSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;
