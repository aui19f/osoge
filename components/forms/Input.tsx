import { FormInput } from "@/types/forms";

export default function Input({
  name,
  onChange,
  value,
  className,
  errors = [],
  ...rest //  기본 스타일 외에 필요한 모든 HTML 속성 사용
}: FormInput) {
  return (
    <>
      <input
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
        className={` border-gray-400  w-full ${className}`}
      />
      {errors.length > 0 && <></>}
    </>
  );
}
