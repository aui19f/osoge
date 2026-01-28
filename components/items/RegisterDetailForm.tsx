import { startTransition, useActionState, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { STATUS_OPTIONS } from "@/utils/constants/status";
import { formatPhoneNumber } from "@/utils/formatter/phone";

import dayjs from "dayjs";
import {
  PaymentMethodTarget,
  ReceiptFormValues,
  updateReceiptSchema,
} from "@/schemas/register";

import { ModalBody, ModalFooter } from "@/components/modal/ModalParts";
import Button from "@/components/forms/Button";
import NumberInput from "@/components/forms/InputNumber";
import Tabs from "@/components/forms/Tabs";
import Textarea from "@/components/forms/Textarea";
import ModalGroup from "@/components/items/ModalGroup";

import { selectRegisterByIdItemRes } from "@/app/actions/register";
import { setRegister } from "@/app/master/(with-menu)/list/actions";
import { PAYMENTMETHOD_OPTIONS } from "@/utils/constants/money";
import Toast from "@/components/modal/Toast";

interface RegisterDetailsFormProps {
  id: string;
  item: selectRegisterByIdItemRes;
  onClose: () => void;
}

export default function RegisterDetailsForm({
  id,
  item,
  onClose,
}: RegisterDetailsFormProps) {
  const [isModal, setIsModal] = useState(false);
  const [isToast, setIsToast] = useState(false);
  const [saveType, setSaveType] = useState<"save" | "send" | "">("");
  const [confirmData, setConfirmData] = useState<ReceiptFormValues>();

  const [state, actions] = useActionState(setRegister, null);

  const {
    register,
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<ReceiptFormValues>({
    resolver: zodResolver(updateReceiptSchema),
    defaultValues: {
      id,
      saveType: "",
      price: item.price || 0,
      paymentMethod: (item.paymentMethod as PaymentMethodTarget) || "none",
      status: item.status,
      memo: item.memo || "",
    },
  });
  // 변경 사항이 있고(isDirty), 검증 결과가 유효할 때(isValid)만 버튼 활성화

  // 1단계: RHF 검증 완료 후 실행
  const onSubmitClick = (data: ReceiptFormValues) => {
    setConfirmData(data); // 검증된 데이터 보관
    setIsModal(true); // 확인 모달 열기
  };

  const handleFinalConfirm = () => {
    if (!confirmData) return;

    const formData = new FormData();
    Object.entries(confirmData).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    formData.append("saveType", saveType);

    startTransition(() => {
      actions(formData);
      setIsModal(false);
    });
  };

  useEffect(() => {
    if (state?.status) {
      setIsToast(true);
    }
  }, [state]);

  return (
    <div className="flex-1">
      <form
        onSubmit={handleSubmit(onSubmitClick)}
        className="flex flex-col h-full"
      >
        
      <ModalBody>
        <ul className="[&>li]:flex [&>li]:items-center [&>li]:gap-2 space-y-4 flex-1">
          <li>
            <p className="w-20 font-bold">접수일</p>
            <p className="flex-1">
              {dayjs(item.created_at).format("YYYY-MM-DD HH:mm")}
            </p>
          </li>

          {item?.completionAt && (
            <li>
              <p className="w-20 font-bold">완료일</p>
              <p className="flex-1">
                {dayjs(item.completionAt).format("YYYY-MM-DD HH:mm")}{" "}
                <span className="font-bold">
                  (+
                  {dayjs(item?.completionAt).diff(
                    dayjs(item?.created_at),
                    "day"
                  )}
                  일)
                </span>
              </p>
            </li>
          )}

          {item?.phone && (
            <li>
              <p className="w-20 font-bold">핸드폰</p>
              <p className="flex-1">
                {formatPhoneNumber(String(item?.phone))}
              </p>
            </li>
          )}

          <li className="[&>div]:flex-1">
            <p className="w-20 font-bold">가격</p>

            <div>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    {...field}
                    placeholder="금액을 입력하세요" // 이제 placeholder가 잘 보입니다.
                  />
                )}
              />
              <p className="text-sm text-red-400">
                0으로 입력 시, 고객에게 전달되는 가격정보는 비공개됩니다.
              </p>
            </div>
          </li>

          <li className="[&>ul]:flex-1">
            <p className="w-20 font-bold">방법</p>
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <Tabs
                  options={PAYMENTMETHOD_OPTIONS.filter(
                    (option) => option.id !== "none"
                  )}
                  selected={field.value}
                  onChange={(option) => {
                    field.onChange(
                      field.value === option ? "none" : option
                    );
                  }}
                />
              )}
            />
          </li>

          <li className="[&>ul]:flex-1">
            <p className="w-20 font-bold">상태</p>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Tabs
                  options={STATUS_OPTIONS}
                  selected={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </li>

          <li className="">
            <p className="w-20 font-bold">메모</p>
            <div className="flex-1 [&>textarea]:w-full">
              <Controller
                name="memo"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} placeholder="메모" />
                )}
              />
              <p className="text-sm">해당 내용은 전송되지 않습니다.</p>
            </div>
          </li>
        </ul>
      </ModalBody>
        

        <ModalFooter>
          <input {...register("id")} type="hidden" />
          <Button type="button" onClick={onClose}>
            취소
          </Button>
          <Button
            type="submit"
            variant="primary-line"
            disabled={!isDirty}
            onClick={() => setSaveType("save")}
          >
            저장
          </Button>
          {item.phone && (
            <Button
              type="submit"
              variant="primary"
              onClick={() => setSaveType("send")}
            >
              저장 및 전송
            </Button>
          )}
        </ModalFooter>
      </form>
      {isModal && confirmData && (
        <ModalGroup
          type={saveType}
          data={confirmData}
          onSave={handleFinalConfirm}
          onCnacel={() => setSaveType("")}
        />
      )}

      {isToast && state?.message && (
        <Toast message={state.message} onClose={() => setIsToast(false)} />
      )}
    </div>
  );
}
