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
  isAgree: z.boolean(),
});

export const PAY_OPTIONS = [
  { id: "prepaid", label: "선불" },
  { id: "postpaid", label: "후불" },
];

export const updateReceiptSchema = z.object({
  // formType: z.string(),
  // price: z.number().optional(), //.min(0, "가격은 0원 이상이어야 합니다.")
  price: z
    .preprocess(
      (val) => {
        // 1. 문자열인 경우 콤마 제거
        if (typeof val === "string") {
          const transformed = val.replace(/,/g, "");
          // 2. 빈 문자열("")이거나 공백만 있다면 0 반환, 아니면 숫자로 변환
          return transformed.trim() === "" ? 0 : parseInt(transformed, 10);
        }
        // 3. 숫자가 아닌 값이 들어올 경우를 대비해 기본값 0 처리
        return typeof val === "number" ? val : 0;
      },
      // 최종적으로 반드시 숫자가 되도록 보장
      z.number({ invalid_type_error: "숫자만 입력 가능합니다." })
    )
    .default(0) as z.ZodType<number>,
  // price: z.number().optional(),
  // ... 나머지 필드
  paymentMethod: z.string().optional(),
  status: z.nativeEnum(EnumStatus, {
    errorMap: () => ({ message: "올바른 상태값을 선택해주세요." }),
  }),
  memo: z.string().max(500, "메모는 500자 이내로 입력해주세요.").optional(),
});
// 이 타입을 useForm의 제네릭으로 사용합니다.
export type ReceiptFormValues = z.infer<typeof updateReceiptSchema>;
