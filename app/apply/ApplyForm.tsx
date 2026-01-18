"use client";

import { createApply } from "@/app/apply/actions";
import ApplyModals from "@/app/apply/ApplyModals";
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import InputFormatted from "@/components/forms/InputFormatted";
import Textarea from "@/components/forms/Textarea";
import verifyBusinessStatus from "@/lib/api/verifyBusinessStatus";

import { ApplyInput, applySchema } from "@/schemas/apply";
import { useLoadingStore } from "@/store/useLoading";
import { changeFormatKoPhoneNumber } from "@/utils/formatter/phone";
import { changeBusinessNumber } from "@/utils/formatter/business";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function ApplyForm() {
  const { setLoading } = useLoadingStore();
  const [checkBiz, setCheckBiz] = useState("");

  const [isConfirm, setIsConfirm] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  const [state, actions, isPending] = useActionState(createApply, null);
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
  } = useForm<ApplyInput>({
    resolver: zodResolver(applySchema),
    mode: "onTouched",
  });

  const checkStatus = async () => {
    setLoading(true);
    const { tax_type_cd = "" } = await verifyBusinessStatus(
      String(getValues("biz_num"))
    );
    setCheckBiz(tax_type_cd === "" ? "none" : "");
    setValue("biz_num_status", "조회");
    setLoading(false);
  };

  const submit = (data: ApplyInput) => {
    startTransition(() => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(
          key,
          value === undefined || value === null ? "" : String(value)
        );
      });
      actions(formData);
    });
  };

  const onClose = () => {
    if (!isAlert) {
      reset();
    }
    setIsAlert(false);
    setIsConfirm(false);
  };

  useEffect(() => {
    if (!state) return;

    if (state.status === 200) {
      setIsConfirm(true);
    } else if (state.status !== undefined) {
      setIsAlert(true);
    }
  }, [state, reset]);

  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        className="space-y-3 z-20 bg-gray-50 p-3 rounded-md [&>button]:w-full w-full md:max-w-2xl md:space-y-8"
      >
        <div className="space-y-1">
          <p className="font-bold text-gray-800">성명*</p>
          <div
            className={`${
              errors.name ? "border border-red-400 rounded-sm" : ""
            }`}
          >
            <Input {...register("name")} placeholder="성명" />
          </div>
        </div>

        <div className="space-y-1">
          <p>
            <span className="font-bold text-gray-800">핸드폰*</span>
            {errors.phone && (
              <span className="mx-2 text-sm text-red-400">
                {errors.phone.message}
              </span>
            )}
          </p>
          <div
            className={`${
              errors.phone ? "border border-red-400 rounded-sm" : ""
            }`}
          >
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <InputFormatted
                  {...field}
                  formatter={changeFormatKoPhoneNumber}
                  maxLength={13}
                  placeholder="010-0000-0000"
                />
              )}
            />
          </div>

          <div className="space-y-1 [&>textarea]:w-full">
            <p className="font-bold text-gray-800">문의사항</p>
            <Controller
              name="memo"
              control={control}
              render={({ field: { value, ...restField } }) => (
                <Textarea
                  {...restField}
                  value={value ?? ""}
                  placeholder="문의사항을 입력해주세요"
                />
              )}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 my-4">
          <div className="flex-1 border-b border-b-gray-200"></div>
          <p className="text-slate-400">[선택사항] 사업장이 있으신가요?</p>
          <div className="flex-1 border-b border-b-gray-200"></div>
        </div>

        <div className="space-y-1">
          <p>
            <span className="font-bold text-gray-800">사업자등록번호</span>
            {checkBiz === "none" && (
              <span className="mx-2 text-sm text-gray-300">
                조회되지 않는 사업장입니다.
              </span>
            )}
            <input type="hidden" {...register("biz_num_status")} />
          </p>
          <div className="flex items-center gap-2 [&>input]:flex-1">
            <Controller
              name="biz_num"
              control={control}
              render={({ field: { value, onChange, ...restField } }) => (
                <InputFormatted
                  {...restField}
                  value={value ?? ""}
                  formatter={changeBusinessNumber}
                  maxLength={12}
                  placeholder="000-00-00000"
                  onChange={(e) => {
                    onChange(e);
                    if (checkBiz !== "") {
                      setCheckBiz("");
                    }
                  }}
                />
              )}
            />
            <Button type="button" variant="dark" onClick={checkStatus}>
              조회
            </Button>
          </div>
        </div>
        <div className="space-y-1">
          <p className="font-bold text-gray-800">상호</p>
          <Input {...register("company")} placeholder="상호" />
        </div>
        <Button type="submit" variant="primary" disabled={isPending}>
          문의접수하기
        </Button>
      </form>

      <ApplyModals
        onCancel={onClose}
        phone={getValues("phone")}
        isConfirm={isConfirm}
        isAlert={isAlert}
      />
    </>
  );
}
