import { z } from "zod";

export const applySchema = z.object({
  name: z.string().min(1, "성명을 입력해주세요"),
  phone: z
    .string()
    .min(1, "전화번호를 입력해주세요.")
    .refine(
      (val) => {
        const numbers = val.replace(/[^0-9]/g, ""); //숫자추출
        // 2. 10자리 또는 11자리이며, 01로 시작하는지 확인
        return (
          (numbers.length === 10 || numbers.length === 11) &&
          numbers.startsWith("01")
        );
      },
      {
        message: "올바른 휴대폰 번호 형식이 아닙니다.",
      }
    ),
  company: z.string().optional().nullable(),
  biz_num: z.string().optional().nullable(),
  biz_num_status: z.string().optional().nullable(),
  memo: z.string().optional().nullable(),
});

export type ApplyInput = z.infer<typeof applySchema>;
