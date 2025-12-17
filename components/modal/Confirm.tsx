// components/modal/Confirm.tsx
import Button from "@/components/forms/Button";
import ModalBase from "./ModalBase";
import { ModalBody, ModalFooter } from "./ModalParts";

interface ConfirmProps {
  children: React.ReactNode;
  cancel: () => void;
  ok: () => void;
  cancelText?: string;
  okText?: string;
}

export default function Confirm({
  children,
  cancel,
  ok,
  cancelText = "취소",
  okText = "확인",
}: ConfirmProps) {
  return (
    <ModalBase size="sm" onBackdropClick={cancel}>
      <ModalBody className="border-b border-gray-300">{children}</ModalBody>
      <ModalFooter>
        <Button type="button" sizes="sm" variant="dark-line" onClick={cancel}>
          {cancelText}
        </Button>
        <Button type="button" sizes="sm" variant="primary" onClick={ok}>
          {okText}
        </Button>
      </ModalFooter>
    </ModalBase>
  );
}
