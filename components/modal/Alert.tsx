import Button from "@/components/forms/Button";
import ModalBase from "./ModalBase";
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalHeaderProps,
} from "./ModalParts";

interface AlertProps extends ModalHeaderProps {
  children: React.ReactNode;
}

export default function Alert({
  title = "",
  icon,
  children,
  onClose,
}: AlertProps) {
  return (
    <ModalBase size="sm" onBackdropClick={onClose}>
      {title && <ModalHeader title={title} icon={icon} />}
      <ModalBody className="border-b border-gray-300">{children}</ModalBody>
      <ModalFooter>
        <Button type="button" sizes="md" variant="primary" onClick={onClose}>
          확인
        </Button>
      </ModalFooter>
    </ModalBase>
  );
}
