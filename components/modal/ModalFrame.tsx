// components/modal/ModalFrame.tsx
import ModalBase from "./ModalBase";
import { ModalHeader, ModalBody } from "./ModalParts";

interface ModalFrameProps {
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "full";
  onClose?: () => void;
}

export default function ModalFrame({
  title,
  children,
  size = "md",
  onClose,
}: ModalFrameProps) {
  return (
    <ModalBase size={size} onBackdropClick={onClose}>
      {title && <ModalHeader title={title} onClose={onClose} />}
      <ModalBody>{children}</ModalBody>
    </ModalBase>
  );
}
