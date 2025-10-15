import { BASE_STYLE, FormIButton } from "@/types/forms";

export const variants = {
  base: "border-gray-400",
  primary: "bg-brand-primary bg-blue-400 border-blue-400 text-white",
  secondary: "bg-gray-300 text-black",
  success: "bg-green-500 text-white",
  danger: "bg-red-500 text-white",
  warning: "bg-yellow-400 text-black",
  info: "bg-sky-400 text-white",
  light: "bg-white text-black border border-gray-300", // light에 테두리 색상 추가
  dark: "bg-gray-900 text-white",
} as const; // 'as const'를 사용 > 객체의 속성을 읽기 전용으로 만든다.(정확한 문자열 리터럴 타입으로 추론)

export default function Button({
  type = "button",
  children,
  onClick,
  variant = "base",
  disabled = false,
}: FormIButton) {
  const variantStyle = variants[variant];

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${BASE_STYLE} ${variantStyle} `}
    >
      {children}
    </button>
  );
}
