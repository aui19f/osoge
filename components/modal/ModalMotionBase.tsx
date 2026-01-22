interface ModalBaseProps {
  children: React.ReactNode;
  onBackdropClick?: () => void;
}

export default function ModalMotionBase({
  children,
  onBackdropClick,
}: ModalBaseProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onBackdropClick) {
      onBackdropClick();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60"
      onClick={handleBackdropClick}
    >
      <div className="w-full overflow-hidden">{children}</div>
    </div>
  );
}
