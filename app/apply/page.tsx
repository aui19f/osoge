"use client";

import ApplyForm from "@/app/apply/actions";
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";

import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Textarea from "@/components/forms/Textarea";
import ConfirmApply from "@/components/modal/ConfirmApply";
import { ApplyFormValues, applySchema } from "@/schemas/apply";
import BusinessInput, {
  bizStatus,
} from "@/components/forms/InputBusinessNumber";
import InputPhone from "@/components/forms/InputPhone";

import AlertApply from "@/components/modal/AlertApply";
import { useRouter } from "next/navigation";
import { useLoadingStore } from "@/store/useLoading";

export default function Apply() {
  const router = useRouter();
  const [isConfirm, setIsConfirm] = useState(false);
  const [biz, setBiz] = useState<bizStatus>();
  const [phone, setPhone] = useState("");

  const [isModal, setIsModal] = useState(false);
  const [memo, setMemo] = useState("");
  const [sendFormData, setSendFormData] = useState<FormData | null>(null);
  const [displayValues, setDisplayValues] = useState<ApplyFormValues | null>(
    null
  );

  const { setLoading } = useLoadingStore();

  const [state, action, isPending] = useActionState(ApplyForm, null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplyFormValues>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      phone: "",
      memo: "",
      biz_num: "",
      biz_num_status: "",
    },
  });

  const onSubmit = (values: ApplyFormValues) => {
    setDisplayValues(values);
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    setSendFormData(formData);
    setIsConfirm(true);
  };

  const changePhone = (values: string) => {
    setPhone(values);
    setValue("phone", values);
  };
  const chnageMemo = (values: string) => {
    setMemo(values);
    setValue("memo", values);
  };

  const changeBizNumber = ({ bizNum, bizTaxCode }: bizStatus) => {
    setBiz({ bizNum, bizTaxCode });
    setValue("biz_num", bizNum);
    setValue("biz_num_status", bizTaxCode);
  };

  const submitData = () => {
    if (!sendFormData) return;
    action(sendFormData);
  };

  const onCloseApply = () => {
    setLoading(true, "page");
    router.push("/");
  };

  useEffect(() => {
    setIsModal(true);
  }, [state]);

  return (
    <div className="flex flex-col items-center w-full h-screen gap-2 p-4 overflow-auto">
      <Image
        src="/images/background/office_620822_1280.jpg"
        fill={true}
        alt="신청서"
        style={{
          objectFit: "cover",
        }}
      />

      <div className="z-20 py-4 text-center">
        <h2 className="text-2xl font-bold text-white">오소게</h2>
        <p className=" text-gray-50">
          귀사의 성공적인 도입을 위한 <br />
          최적의 솔루션을 상담해 드립니다.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
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
            <InputPhone value={phone} onChange={(val) => changePhone(val)} />
          </div>
        </div>

        <div className="space-y-1 [&>textarea]:w-full">
          <p className="font-bold text-gray-800">문의사항</p>
          <Textarea
            name="memo"
            value={memo}
            onChange={(e) => chnageMemo(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 my-4">
          <div className="flex-1 border-b border-b-gray-200"></div>
          <p className="text-slate-400">[선택사항] 사업장이 있으신가요?</p>
          <div className="flex-1 border-b border-b-gray-200"></div>
        </div>
        <div className="space-y-1">
          <p>
            <span className="font-bold text-gray-800">사업자등록번호</span>
            {biz?.bizTaxCode === "none" && (
              <span className="mx-2 text-sm text-gray-300">
                조회되지 않는 사업장입니다.
              </span>
            )}
          </p>
          <BusinessInput
            bizNum={biz?.bizNum || ""}
            onChecked={(params: bizStatus) => changeBizNumber(params)}
          />
        </div>

        <div className="space-y-1">
          <p className="font-bold text-gray-800">상호</p>
          <Input {...register("company")} placeholder="상호" />
        </div>

        <Button type="submit" variant="primary" disabled={isPending}>
          문의접수하기
        </Button>
      </form>
      {isConfirm && displayValues?.phone && (
        <ConfirmApply
          phone={displayValues.phone}
          onCancel={() => setIsConfirm(false)}
          onConfirm={submitData}
        />
      )}
      {isModal && state?.status && (
        <AlertApply code={state?.status} onClose={() => onCloseApply()} />
      )}
    </div>
  );
}
