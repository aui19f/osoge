// components/modal/ModalParts.tsx
import Image from "next/image";

// const ICON_COLOR_MAP: Record<string, string> = {
//   checked: "text-green-700",
//   warning: "text-orange-500",
//   error: "text-red-600", // 나중에 추가하기 쉬움
//   info: "text-blue-600", // 나중에 추가하기 쉬움
// };

// Header
export interface ModalHeaderProps {
  title?: string;
  icon?: string;
  onClose?: () => void;
}

export function ModalHeader({ title, icon, onClose }: ModalHeaderProps) {
  const textColor = ""; //= ICON_COLOR_MAP[icon as string] || "text-slate-900";

  return (
    <div className="flex items-center gap-2.5 px-4 py-8 bg-gray-100 relative">
      <div className="flex flex-col items-center justify-center flex-1 gap-4 ">
        {icon && (
          <Image
            src={`/images/icons/modal/${icon}.png`}
            width={48}
            height={48}
            alt="알림창"
            className="bg-cover"
          />
        )}

        <h3 className={`text-xl font-bold ${textColor}`}>{title}</h3>
      </div>
      {onClose && (
        <div onClick={onClose} className="absolute top-4 right-4">
          <Image
            src="/images/icons/close.png"
            width={24}
            height={24}
            alt="닫기"
          />
        </div>
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
