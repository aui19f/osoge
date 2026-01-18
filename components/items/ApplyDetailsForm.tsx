import {
  selectApplyByIdItemRes,
  selectApplyByIdRes,
} from "@/app/actions/apply";
import { setApplyHistory } from "@/app/admin/apply/actions";
import Button from "@/components/forms/Button";
import Tabs from "@/components/forms/Tabs";
import Textarea from "@/components/forms/Textarea";
import Confirm from "@/components/modal/Confirm";
import ModalBase from "@/components/modal/ModalBase";
import { ModalBody, ModalFooter } from "@/components/modal/ModalParts";
import Toast from "@/components/modal/Toast";
import { printStatusLabel, STATUS_OPTIONS } from "@/utils/constants/status";
import { formatPhoneNumber } from "@/utils/formatter/phone";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { startTransition, useActionState, useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";

interface DetailFormProps {
  id: string;
  item: selectApplyByIdRes;
  type: string;
  onClose: () => void;
}

export default function ApplyDetailForm({
  id,
  item,
  type,
  onClose,
}: DetailFormProps) {
  const [isModal, setIsModal] = useState(false);
  const [isToast, setIsToast] = useState(false);
  const [confirmData, setConfirmData] = useState<selectApplyByIdItemRes>();

  const [state, actions] = useActionState(setApplyHistory, null);

  const queryClient = useQueryClient();
  const { register, control, setValue, handleSubmit } =
    useForm<selectApplyByIdItemRes>({
      defaultValues: {
        id,
        status: item?.status,
        memo: item?.memo,
        phone: item?.phone,
      },
    });

  const onSubmit = (data: selectApplyByIdItemRes) => {
    setConfirmData(data);
  };
  const handleFinalConfirm = () => {
    if (!confirmData) return;
    const formData = new FormData();
    Object.entries(confirmData).forEach(([key, value]) => {
      formData.append(key, value ? String(value) : "");
    });

    startTransition(() => {
      actions(formData);
      setIsModal(false);
    });
  };

  useEffect(() => {
    if (state?.status === 200) {
      setValue("memo", "");
      queryClient.invalidateQueries({ queryKey: ["apply"] });
    }
    if (state?.status) {
      setIsToast(true);
    }
  }, [state, setValue, queryClient]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="overflow-auto">
        <ModalBody>
          <ul className="flex flex-col [&>li]:flex [&>li]:items-center [&>li]:gap-2 space-y-3">
            <li>
              <p className="w-20 font-bold">상호</p>
              <p>{item?.biz_name || "-"} </p>
            </li>
            <li>
              <p className="w-20 font-bold">사업자등록</p>
              <p>{item?.biz_num || "-"} </p>
            </li>
            <li>
              <p className="w-20 font-bold">핸드폰</p>
              <p>{formatPhoneNumber(item?.phone || "")}</p>
            </li>

            <li>
              <p className="w-20 font-bold">문의내용</p>
              <p className="flex-1">{item?.memo || "-"}</p>
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

            {item?.apply_histories && item.apply_histories.length > 0 && (
              <li className="flex-1 [&>div]:flex-1">
                <p className="w-20 font-bold">상담내역{type}</p>
                <div
                  className={`space-y-1 ${
                    type === "page" ? "" : "overflow-auto max-h-24"
                  }`}
                >
                  {item.apply_histories.map((history) => (
                    <div
                      key={new Date(history.created_at).getTime()}
                      className="p-1 text-sm bg-gray-100 rounded-sm"
                    >
                      <span className="font-bold">
                        [{dayjs(history.created_at).format("YYYY/MM/DD HH:mm")}
                        ]({history.admin_id})
                      </span>
                      <br />
                      <span>{history.status}</span>-
                      <span>{history.content}</span>
                    </div>
                  ))}
                </div>
              </li>
            )}
            <li>
              <p className="w-20 font-bold">상담내용</p>
              <div className="flex-1 [&>textarea]:w-full">
                <Controller
                  name="memo"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      placeholder="메모"
                    />
                  )}
                />
              </div>
            </li>
          </ul>
        </ModalBody>
        <ModalFooter className="[&>button]:flex-1">
          <input {...register("id")} type="hidden" />
          <Button type="button" onClick={onClose}>
            취소
          </Button>
          <Button
            type="submit"
            variant="primary"
            onClick={() => setIsModal(true)}
          >
            저장
          </Button>
        </ModalFooter>
      </form>
      {isModal && (
        <ModalBase>
          <Confirm
            title={"변경사항을 저장하시겠습니까?"}
            icon={"receipt_sava"}
            onCancel={() => setIsModal(false)}
            onOk={handleFinalConfirm}
          >
            <div className="space-y-2">
              <div className="flex gap-2 ">
                <p className="w-20 font-bold">상태</p>
                <p>{printStatusLabel(confirmData?.status || "")}</p>
              </div>
              <div className="flex gap-2 ">
                <p className="w-20 font-bold">상담내역</p>
                <div>
                  <p>{confirmData?.memo || "-"}</p>
                </div>
              </div>
            </div>
          </Confirm>
        </ModalBase>
      )}
      {isToast && state?.message && (
        <Toast message={state.message} onClose={() => setIsToast(false)} />
      )}
    </>
  );
}
