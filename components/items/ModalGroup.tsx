import Confirm from "@/components/modal/Confirm";
import ModalBase from "@/components/modal/ModalBase";
import { ReceiptFormValues } from "@/schemas/register";
import { printPaymentMethod } from "@/utils/constants/money";
import { printStatusLabel } from "@/utils/constants/status";

interface ModalGroupProps {
  type: string;
  data: ReceiptFormValues;
  onSave: () => void;
  onCnacel: () => void;
}
export default function ModalGroup({
  type = "",
  data,
  onSave,
  onCnacel,
}: ModalGroupProps) {
  const { price, paymentMethod, status, memo } = data;
  return (
    <>
      {type && (
        <ModalBase>
          {type === "save" && (
            <Confirm
              title={"변경사항을 저장하시겠습니까?"}
              icon={"receipt_sava"}
              onOk={onSave}
              onCancel={onCnacel}
              okLabel="저장"
            >
              <div className="space-y-4">
                {price > 0 && (
                  <div className="flex">
                    <p className="w-20 font-bold">가격</p>
                    <p className="flex-1">{price}</p>
                  </div>
                )}
                {paymentMethod && paymentMethod !== "none" && (
                  <div className="flex">
                    <p className="w-20 font-bold">결제방법</p>
                    <p>{printPaymentMethod(paymentMethod)}</p>
                  </div>
                )}
                <div className="flex">
                  <p className="w-20 font-bold">상태</p>
                  <p>{printStatusLabel(status)}</p>
                </div>

                <div className="flex">
                  <p className="w-20 font-bold">메모</p>
                  <div className="flex-1 overflow-auto max-h-24">
                    <p>{memo}</p>
                  </div>
                </div>
              </div>
            </Confirm>
          )}

          {type === "send" && (
            <Confirm
              title={"완료 메시지를 전송 하시겠습니까?"}
              icon={"receipt_send"}
              onOk={onSave}
              onCancel={onCnacel}
            >
              <div className="p-2 mb-4 space-y-2 border-gray-100 ">
                <h4 className="text-xl font-bold">
                  변경사항은 아래와 같습니다.
                </h4>

                {price > 0 && (
                  <div className="flex">
                    <p className="w-20 font-bold">가격</p>
                    <p className="flex-1">{price}</p>
                  </div>
                )}
                {paymentMethod && paymentMethod !== "none" && (
                  <div className="flex">
                    <p className="w-20 font-bold">결제방법</p>
                    <p>{printPaymentMethod(paymentMethod)}</p>
                  </div>
                )}
                <div className="flex">
                  <p className="w-20 font-bold">상태</p>
                  <p>{printStatusLabel(status)}</p>
                </div>

                <div className="flex">
                  <p className="w-20 font-bold">메모</p>
                  <div className="flex-1 overflow-auto max-h-24">
                    <p>{memo}</p>
                  </div>
                </div>
              </div>
              <div className="p-2 my-4 space-y-4 bg-gray-100 rounded-md">
                <h4 className="text-xl font-bold">-전송메시지-</h4>
                <p>
                  안녕하세요. ‘누벨맞춤옷수선’ 입니다.
                  <br />
                  고객님께서 YYYY/MM/DD 에 접수한 수선이 완료되었습니다.
                </p>
                <div>
                  <div className="flex">
                    <p className="w-20 font-bold">주소</p>
                    <p className="flex-1">
                      경기 성남시 분당구 판교공원로5길 26-1 101호{" "}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="w-20 font-bold">연락처</p>
                    <p className="flex-1">000,000</p>
                  </div>
                  {price > 0 && (
                    <div className="flex">
                      <p className="w-20 font-bold">가격</p>
                      <p className="flex-1">000,000</p>
                    </div>
                  )}
                  <div className="flex">
                    <p className="w-20 font-bold">영업시간</p>
                    <p className="flex-1">??</p>
                  </div>
                </div>
                <p>감사합니다.</p>
              </div>
            </Confirm>
          )}
        </ModalBase>
      )}
    </>
  );
}
