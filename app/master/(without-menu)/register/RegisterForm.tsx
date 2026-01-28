"use client";
import { createRegister } from "@/app/master/(without-menu)/register/actions";
import RegisterModalGroup from "@/app/master/(without-menu)/register/RegisterModalGroup";
import Button from "@/components/forms/Button";
import Checkbox from "@/components/forms/Checkbox";
import Keypad from "@/components/keyboard/Keypad";
import PhoneInputDisplay from "@/components/keyboard/PhoneInputDisplay";
import { RegisterInput } from "@/schemas/register";
import { startTransition, useActionState, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const REGISTER_AGREE = [
  { id: "agree", label: "[필수] 개인정보 수집 및 이용동의" },
];

export default function RegisterForm({ storeId }: { storeId: string }) {
  const [isConfirm, setIsConfirm] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  const [state, actions, isPending] = useActionState(createRegister, null);
  const { control, reset, handleSubmit, watch, getValues } =
    useForm<RegisterInput>({
      mode: "onTouched",
      defaultValues: {
        phone: "010",
        agree: [],
        storeId,
      },
    });

  const onCheckValidity = () => {
    setIsConfirm(true);
  };

  const handleFinalSubmit = () => {
    setIsConfirm(false);
    const data = getValues();
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(
        key,
        value === undefined || value === null ? "" : String(value)
      );
    });

    startTransition(() => {
      actions(formData);
    });
  };

  const handleAgreeChange = (
    id: string,
    currentValue: string[],
    onChangeFn: (val: string[]) => void
  ) => {
    const nextValue = currentValue.includes(id)
      ? currentValue.filter((item) => item !== id)
      : [...currentValue, id];
    onChangeFn(nextValue);
  };

  const watchedNumber = watch("phone");

  useEffect(() => {
    if (state?.status === 200) {
      setIsAlert(true);
      reset();
    }else if(state?.status === 401){
      setIsAlert(true);
    }
  }, [state,reset]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onCheckValidity)}
        className="flex flex-col flex-1 gap-4 "
      >
        <div className="p-4 mt-4">
          <PhoneInputDisplay value={watchedNumber} />
        </div>
        <Controller
          name="phone"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Keypad
              onNumberClick={(num) => {
                if (value.length < 11) onChange(value + num);
              }}
              onDelete={() => {
                onChange(value.slice(0, -1));
              }}
              onSubmit={() => {
                onChange("010");
              }}
            />
          )}
        ></Controller>
        <div className="flex-1">
          <Controller
            name="agree"
            control={control}
            render={({ field }) => (
              <Checkbox
                options={REGISTER_AGREE}
                selected={field.value}
                onChange={(id) =>
                  handleAgreeChange(id, field.value, field.onChange)
                }
              />
            )}
          />

          <p className="mt-1 text-sm">완료된 후 안내메시지를 전송합니다.</p>
        </div>
        <Button
          type="submit"
          variant="primary"
          disabled={watchedNumber.length < 10}
        >
          접수
        </Button>
      </form>

      <RegisterModalGroup
        isConfirm={isConfirm}
        isAlert={isAlert}
        isLoading={isPending}
        phone={getValues("phone")}
        agree={getValues("agree")}
        state={state?.status || 0}
        onCloseConfirm={() => setIsConfirm(false)}
        onCloseAlert={() => {
          setIsAlert(false);
        }}
        onSave={handleFinalSubmit}
      />
    </>
  );
}
