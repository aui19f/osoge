import Button from "@/components/forms/Button";
import ModalBase from "./ModalBase";
import { ModalBody, ModalFooter, ModalHeader } from "./ModalParts";

interface ConfirmProps {
  title?: string;
  icon?: string;
  children: React.ReactNode;
  onCancel: () => void;
  onOk: () => void;
  cancelLabel?: string;
  okLabel?: string;
  size?: "sm" | "md" | "lg" | "full";
}

export default function Confirm({
  title,
  icon,
  children,
  onCancel,
  onOk,
  cancelLabel = "취소",
  okLabel = "확인",
  size = "sm",
}: ConfirmProps) {
  return (
    <ModalBase size={size} onBackdropClick={onCancel}>
      {title && <ModalHeader title={title} icon={icon} />}

      <ModalBody className="border-b border-gray-300">{children}</ModalBody>

      <ModalFooter className="[&>button]:flex-1">
        <Button type="button" variant="dark-line" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button type="button" variant="primary" onClick={onOk}>
          {okLabel}
        </Button>
      </ModalFooter>
    </ModalBase>
  );
}
