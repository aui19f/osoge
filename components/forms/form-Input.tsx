import { InputHTMLAttributes } from "react";

interface IFormInput {
  name: string;
  errors: string[];
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Input({
  name,
  errors,
  onChange,
  value,
  ...rest
}: IFormInput & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <input
        name={name}
        value={value}
        placeholder={rest.placeholder}
        onChange={onChange}
        className="w-full p-3 border rounded-md border-slate-400 placeholder:text-slate-200"
      />
      {errors
        ? errors.map((err, index) => (
            <p key={index} className="mx-2 my-1 text-sm text-red-400">
              {err}
            </p>
          ))
        : null}
    </div>
  );
}
