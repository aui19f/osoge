import { InputHTMLAttributes } from "react";

export const variants = {
  primary: "bg-blue-400 border-blue-400 text-white",
  "primary-line": "border border-blue-400 text-blue-400",
  secondary: "bg-slate-400 border-slate-400 text-white",
  "secondary-line": "border border-slate-400 text-slate-400",
  dark: "bg-slate-600 border-slate-600 text-white",
  "dark-line": "border border-slate-600 text-slate-600",
  disabled: "bg-slate-400 border-slate-400 text-slate-500",
}; //as const; // 'as const'를 사용 > 객체의 속성을 읽기 전용으로 만든다.(정확한 문자열 리터럴 타입으로 추론)

export type Variant = keyof typeof variants;

export const size = {
  sm: "h-auto py-1 px-2 text-sm",
  md: "h-12 p-2",
  lg: "p-2 h-12 font-bold",
};

export type Size = keyof typeof size;

// 텍스트 입력 필드나 단일 선택 컴포넌트의 공통 프롭
export interface FormSingleProp {
  name: string;
  sizes?: Size;
}

export interface FormInput
  extends FormSingleProp,
    Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "onChange"> {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
