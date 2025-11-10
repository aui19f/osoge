import { PHONE_REGEX_KO } from "@/lib/utils/regex";

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
