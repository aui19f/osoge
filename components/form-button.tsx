import clsx from "clsx";
type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary-line" | "secondary"; //| "" | "danger" | "line-secondary";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};
export default function Button({
  type = "button",
  children,
  onClick,
  className,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const baseStyle =
    "rounded-md px-2 py-1 disabled:bg-slate-200 disabled:text-slate-300 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-blue-600 border-blue-600 text-white",
    secondary: "text-gray-50 bg-gray-500 hover:bg-gray-600",
    "secondary-line": "border border-slate-400 text-slate-400",
    danger: "bg-red-600 hover:bg-red-700",
    "line-secondary": "",
  };

  return (
    <button
      type={type}
      className={clsx(baseStyle, variants[variant], className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
