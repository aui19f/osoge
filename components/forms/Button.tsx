import { size, Size, variants, Variant } from "@/types/forms";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  sizes?: Size;
  ref?: React.Ref<HTMLButtonElement>;
}
export default function Button({
  children,
  onClick,
  variant = "dark",
  sizes = "md",
  ref,
  ...rest
}: ButtonProps) {
  const variantStyle = variants[variant];
  const sizeStyle = size[sizes];

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`${variantStyle}  ${sizeStyle} `}
      {...rest}
    >
      {children}
    </button>
  );
}
