import Confirm from "@/components/modal/Confirm";
import { formatPhoneNumber } from "@/utils/formatter/phone";

interface ConfirmApplyProps {
  onCancel: () => void;
  onConfirm: () => void;
  phone: string;
}
export default function ConfirmApply({
  onCancel,
  onConfirm,
  phone,
}: ConfirmApplyProps) {
  return (
    <Confirm cancel={onCancel} ok={onConfirm} okText="문의접수">
      <div className="mb-4 text-center">
        <p>
          고객님의 문의가 신속하게 해소될 수 있도록
          <br /> 최선을 다하여 답변드리겠습니다.
        </p>
        <p>입력한 핸드폰 번호로 문자 드리겠습니다.</p>
      </div>

      <div className="p-2 text-center bg-gray-500 rounded-md">
        <p className="font-bold text-white">{formatPhoneNumber(phone)}</p>
      </div>
    </Confirm>
  );
}
