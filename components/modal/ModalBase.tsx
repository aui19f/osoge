// components/modal/ModalBase.tsx
interface ModalBaseProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "full";
  onBackdropClick?: () => void;
}

const sizeStyles = {
  sm: "w-4/5 md:w-72",
  md: "w-4/5 md:w-96",
  lg: "w-4/5 md:w-[480px]",
  full: "w-full h-full md:w-4/5 md:h-auto",
};

export default function ModalBase({
  children,
  size = "md",
  onBackdropClick,
}: ModalBaseProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onBackdropClick) {
      onBackdropClick();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={handleBackdropClick}
    >
      <div
        className={`overflow-hidden bg-white rounded-lg shadow-lg ${sizeStyles[size]}`}
      >
        {children}
      </div>
    </div>
  );
}
