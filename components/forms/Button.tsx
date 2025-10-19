import { FormIButton, size, variants } from "@/types/forms";

export default function Button({
  type = "button",
  children,
  onClick,
  variant = "base",
  disabled = false,
  sizes = "md",
}: FormIButton) {
  const variantStyle = variants[variant];
  const sizeStyle = size[sizes];

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${variantStyle}  ${sizeStyle}`}
    >
      {children}
    </button>
  );
}
