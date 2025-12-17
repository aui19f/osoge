// components/modal/ModalParts.tsx
import Image from "next/image";

const ICON_COLOR_MAP: Record<string, string> = {
  checked: "text-green-700",
  warning: "text-orange-500",
  error: "text-red-600", // 나중에 추가하기 쉬움
  info: "text-blue-600", // 나중에 추가하기 쉬움
};

// Header
export interface ModalHeaderProps {
  title: string;
  icon?: "checked" | "error";
  onClose?: () => void;
}

export function ModalHeader({ title, icon, onClose }: ModalHeaderProps) {
  const textColor = ICON_COLOR_MAP[icon as string] || "text-slate-900";

  return (
    <div className="flex items-center gap-2.5 px-4 py-12 bg-gray-100">
      <div className="flex flex-col items-center justify-center flex-1 gap-4 ">
        <Image
          src={`/images/icons/alert_${icon}.png`}
          width={32}
          height={32}
          alt="알림창"
          className="bg-cover"
        />

        <h3 className={`text-2xl font-bold ${textColor}`}>{title}</h3>
      </div>
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
