import { FormInput, size } from "@/types/forms";

export default function Input({
  name,
  sizes = "md",
  onChange,

  ...rest //  기본 스타일 외에 필요한 모든 HTML 속성 사용
}: FormInput) {
  const sizeStyle = size[sizes];
  return (
    <>
      <input
        name={name}
        onChange={onChange}
        {...rest}
        className={`border-slate-400  w-full ${sizeStyle}`}
      />
    </>
  );
}
