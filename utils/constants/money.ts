import { PaymentMethodTarget } from "@/schemas/register";

export const PAYMENTMETHOD_LABELS: Record<PaymentMethodTarget, string> = {
  prepaid: "선불",
  postpaid: "후불",
  none: "미지정",
};

/** 2. UI 컴포넌트(Select, Dropdown)용 옵션 */
export const PAYMENTMETHOD_OPTIONS = Object.entries(PAYMENTMETHOD_LABELS).map(
  ([id, label]) => ({
    id: id as PaymentMethodTarget,
    label,
  })
);

/** 3. 한글 변환 함수 */
export const printPaymentMethod = (method: string | PaymentMethodTarget) => {
  return PAYMENTMETHOD_LABELS[method as PaymentMethodTarget] || method;
};
