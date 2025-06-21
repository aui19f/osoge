import { z } from "zod";
import validator from "validator";

export const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "핸드폰 번호 형식이 올바르지 않습니다."
  );
