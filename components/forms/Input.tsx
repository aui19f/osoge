import { FormInput, size } from "@/types/forms";

export default function Input({
  name,
  sizes = "md",
  onChange,
  ...rest
}: FormInput) {
  const sizeStyle = size[sizes];
  return (
    <input
      name={name}
      onChange={onChange}
      {...rest}
      className={`border-slate-400  w-full ${sizeStyle}`}
    />
  );
}
