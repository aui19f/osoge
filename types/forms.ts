import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export const variants = {
  base: "border-gray-400",
  primary: "bg-brand-primary bg-blue-400 border-blue-400 text-white",
  secondary: "bg-gray-300 text-black",
  success: "bg-green-500 text-white",
  danger: "bg-red-500 text-white",
  warning: "bg-yellow-400 text-black",
  info: "bg-sky-400 text-white",
  light: " text-black border border-gray-800", // light에 테두리 색상 추가
  dark: "bg-gray-900 text-white",
} as const; // 'as const'를 사용 > 객체의 속성을 읽기 전용으로 만든다.(정확한 문자열 리터럴 타입으로 추론)

export type Variant = keyof typeof variants;

export const size = {
  sm: "h-auto py-1 px-2",
  md: "h-12 p-2",
  lg: "",
};

export type Size = keyof typeof size;

export type FormOption = {
  id: string;
  label: string;
};

// 체크박스, 라디오 버튼, 셀렉트 등 여러 값을 선택하는 컴포넌트의 공통 프롭
export interface FormMultiProp<T = string[] | string> {
  name: string;
  options: FormOption[];
  selected: T;
  disabled?: boolean;
  sizes?: Size;
  className?: string;
}

// 텍스트 입력 필드나 단일 선택 컴포넌트의 공통 프롭
export interface FormSingleProp {
  //name, value => 중복되서 삭제
  errors?: string[];
  sizes?: Size;
  className?: string;
}

// 내부적으론 type ChangeEventHandler<T = Element> = (event: React.ChangeEvent<T>) => void; 이렇게 작성되어있지만,
// 직관적이게 보기 위해 아래와 같은 타입별로 나눔
export interface FormCheckedbox extends FormMultiProp<string[]> {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface FormSelectbox extends FormMultiProp<string> {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export interface FormTextarea
  extends FormSingleProp,
    TextareaHTMLAttributes<HTMLTextAreaElement> {
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export interface FormInput
  extends FormSingleProp,
    InputHTMLAttributes<HTMLInputElement> {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface FormIButton {
  type?: "button" | "submit" | "reset";
  isDisabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  sizes?: Size;
  className?: string;
}
