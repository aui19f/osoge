import { FormIButton, size, variants } from "@/types/forms";

export default function Button({
  type = "button",
  children,
  onClick,
  variant = "base",
  isDisabled = false,
  sizes = "md",
  className = "",
}: FormIButton) {
  const variantStyle = variants[variant];
  const sizeStyle = size[sizes];

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`${variantStyle}  ${sizeStyle} ${className}`}
    >
      {children}
    </button>
  );
}
