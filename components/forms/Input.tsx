import { Size, size } from "@/types/forms";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  sizes?: Size;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  ref?: React.Ref<HTMLInputElement>;
}

export default function Input({
  name,
  sizes = "md",
  onChange,
  ref,
  ...rest
}: InputProps) {
  const sizeStyle = size[sizes];
  return (
    <input
      name={name}
      ref={ref}
      onChange={onChange}
      {...rest}
      className={`border-slate-400  w-full ${sizeStyle}`}
    />
  );
}
