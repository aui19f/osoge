import { FormInput, size } from "@/types/forms";

export default function Input({
  name,
  onChange,
  value,
  errors = [],
  sizes = "md",
  className = "",
  ...rest //  기본 스타일 외에 필요한 모든 HTML 속성 사용
}: FormInput) {
  const sizeStyle = size[sizes];
  return (
    <>
      <input
        name={name}
        value={value}
        onChange={onChange}
        // autocapitalize="off"
        {...rest}
        className={` border-gray-400  w-full ${sizeStyle} ${className}`}
      />
      {errors.length > 0 && <></>}
    </>
  );
}
