import Alert from "@/components/modal/Alert";
import Confirm from "@/components/modal/Confirm";
import { formatPhoneNumber } from "@/utils/formatter/phone";

interface ApplyModalProps {
  onCancel: () => void;
  phone: string;
  isAlert: boolean;
  isConfirm: boolean;
}
export default function ApplyModals({
  onCancel,
  phone,
  isAlert = false,
  isConfirm = false,
}: ApplyModalProps) {
  return (
    <>
      {isConfirm && (
        <Confirm
          onCancel={onCancel}
          title="문의가 접수되었습니다"
          icon="checked"
          onOk={onCancel}
          okLabel="완료"
          size="md"
        >
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
      )}

      {isAlert && (
        <Alert title="문제가 발생하였습니다." icon="cancel" onClose={onCancel}>
          <p className="my-8 text-center">잠시후 다시 시도해주시기 바랍니다.</p>
        </Alert>
      )}
    </>
  );
}
