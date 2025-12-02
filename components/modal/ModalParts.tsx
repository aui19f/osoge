// components/modal/ModalParts.tsx
import Image from "next/image";

// Header
interface ModalHeaderProps {
  title: string;
  onClose?: () => void;
}

export function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-4 bg-gray-100">
      <h4 className="flex-1 text-xl font-bold">{title}</h4>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="relative transition-opacity size-6 hover:opacity-70"
        >
          <Image src="/images/icons/close.png" fill alt="닫기" />
        </button>
      )}
    </div>
  );
}

// Body
interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalBody({ children, className = "" }: ModalBodyProps) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

// Footer
interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalFooter({ children, className = "" }: ModalFooterProps) {
  return (
    <div className={`flex items-center justify-end gap-2 p-2  ${className}`}>
      {children}
    </div>
  );
}
