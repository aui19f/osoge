import {
  PHONE_10_DIGIT_REGEX,
  PHONE_11_DIGIT_REGEX,
} from "@/utils/formatter/regex";

/**
 * 핸드폰 번호 포맷팅 (01012345678 -> 010-1234-5678)
 */
export const formatPhoneNumber = (phone: string): string => {
  const numbers = phone.replace(/[^0-9]/g, "");
  if (numbers.length === 11) {
    return numbers.replace(PHONE_11_DIGIT_REGEX, "$1-$2-$3");
  } else if (numbers.length === 10) {
    return numbers.replace(PHONE_10_DIGIT_REGEX, "$1-$2-$3");
  }
  return phone;
};

// ✅ 한국 휴대폰 번호 포맷 함수 (10자리, 11자리 둘 다 지원)
export function changeFormatKoPhoneNumber(digits: string) {
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length <= 10)
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
}
