// components/modal/Confirm.tsx
import Button from "@/components/forms/Button";
import ModalBase from "./ModalBase";
import { ModalBody, ModalFooter, ModalHeader } from "./ModalParts";

interface ConfirmProps {
  title?: string;
  icon?: string;
  children: React.ReactNode;
  cancel: () => void;
  ok: () => void;
  cancelLabel?: string;
  okLabel?: string;
}

export default function Confirm({
  title,
  icon,
  children,
  cancel,
  ok,
  cancelLabel = "취소",
  okLabel = "확인",
}: ConfirmProps) {
  return (
    <ModalBase size="sm" onBackdropClick={cancel}>
      {title && <ModalHeader title={title} icon={icon} />}

      <ModalBody className="border-b border-gray-300">{children}</ModalBody>

      <ModalFooter className="[&>button]:flex-1">
        <Button type="button" variant="dark-line" onClick={cancel}>
          {cancelLabel}
        </Button>
        <Button type="button" variant="primary" onClick={ok}>
          {okLabel}
        </Button>
      </ModalFooter>
    </ModalBase>
  );
}
