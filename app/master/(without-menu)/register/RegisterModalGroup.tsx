import GifLoading from "@/components/loading/GifLoading";
import Alert from "@/components/modal/Alert";
import Confirm from "@/components/modal/Confirm";
import Toast from "@/components/modal/Toast";
import { formatPhoneNumber } from "@/utils/formatter/phone";

interface RegisterModalGroupProps {
  isConfirm: boolean;
  isAlert: boolean;
  phone: string;
  agree: string[];
  state: number;
  isLoading: boolean;
  onCloseConfirm: () => void;
  onCloseAlert: () => void;
  onSave: () => void;
}
export default function RegisterModalGroup({
  isConfirm,
  isAlert,
  phone,
  agree,
  state,
  isLoading,
  onCloseConfirm,
  onCloseAlert,
  onSave,
}: RegisterModalGroupProps) {
  const handleSave = () => {
    onSave();
  };

  return (
    <>
      {isConfirm && (
        <Confirm
          title="접수하시겠습니까?"
          icon={agree.length === 0 ? "caution" : "sms"}
          onCancel={onCloseConfirm}
          onOk={handleSave}
        >
          <div className="text-center">
            {agree.length === 0 ? (
              <p>
                개인 정보 수집 및 이용 동의에 동의하지 않을 경우,
                <span className="text-red-400">
                  완료 메시지가 전송되지 않습니다.
                </span>
                <br />
                진행하시겠습니까?
              </p>
            ) : (
              <>
                <p className="mb-2">{formatPhoneNumber(phone)}</p>
                <p>
                  완료시 해당 번호로 안내메시지를 전송합니다.
                  <br />
                  진행하시겠습니까?
                </p>
              </>
            )}
          </div>
        </Confirm>
      )}

      {isLoading && (
        <GifLoading
          file="register_loading"
          message="데이터를 저장하고 있습니다..."
          onClose={() => {}}
        />
      )}

      {isAlert ? (
        state === 200 ? (
          <Toast
            message="접수가 완료되었습니다"
            onClose={() => onCloseAlert()}
          />
        ) : (
          <Alert onClose={() => onCloseAlert()}>
            <p>
              접수 중 오류가 발생했습니다.
              <br /> 관리자에게 문의하여주십시오.
            </p>
          </Alert>
        )
      ) : null}
    </>
  );
}
