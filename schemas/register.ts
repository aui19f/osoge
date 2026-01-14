import { PHONE_REGEX_KO } from "@/utils/formatter/regex";
import { EnumStatus } from "@prisma/client";
import { z } from "zod";

export const registerSchema = z.object({
  phone: z
    .string()
    .regex(
      PHONE_REGEX_KO,
      "유효하지 않은 휴대전화 번호 형식입니다 (하이픈 제외 숫자만 입력)."
    ),
  agree: z.array(z.string()),
  storeId: z.string().min(1),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const updateReceiptSchema = z.object({
  id: z.string(),
  saveType: z.string(),
  price: z
    .preprocess((val) => {
      if (typeof val === "string") {
        const transformed = val.replace(/,/g, "");
        return transformed.trim() === "" ? 0 : parseInt(transformed, 10);
      }
      return typeof val === "number" ? val : 0;
    }, z.number({ invalid_type_error: "숫자만 입력 가능합니다." }))
    .default(0) as z.ZodType<number>,

  paymentMethod: z.enum(["prepaid", "postpaid", "none"]),
  status: z.nativeEnum(EnumStatus, {
    errorMap: () => ({ message: "올바른 상태값을 선택해주세요." }),
  }),
  memo: z
    .string()
    .trim()
    .max(500, "메모는 500자 이내로 입력해주세요.")
    .optional(),
});
// 이 타입을 useForm의 제네릭으로 사용합니다.
export type ReceiptFormValues = z.infer<typeof updateReceiptSchema>;
export type PaymentMethodTarget = z.infer<
  typeof updateReceiptSchema
>["paymentMethod"];
