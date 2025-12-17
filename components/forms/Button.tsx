import { FormIButton, size, variants } from "@/types/forms";

export default function Button({
  children,
  onClick,
  variant = "secondary-line",
  sizes = "md",
  ...rest
}: FormIButton) {
  const variantStyle = variants[variant];
  const sizeStyle = size[sizes];

  return (
    <button
      onClick={onClick}
      className={`${variantStyle}  ${sizeStyle} `}
      {...rest}
    >
      {children}
    </button>
  );
}
