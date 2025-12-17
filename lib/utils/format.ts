import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { PHONE_10_DIGIT_REGEX, PHONE_11_DIGIT_REGEX } from "@/lib/utils/regex";

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

/**
 * 숫자에 천 단위 콤마 추가 (입력 값 포맷팅용)
 * @param allowDecimal 소수점 허용 여부
 */
export const formatCommaNumber = (
  val: string | number,
  allowDecimal: boolean = false
): string => {
  if (val === "" || val === null || val === undefined) return "";

  const stringVal = String(val);

  if (allowDecimal) {
    const [integer, decimal] = stringVal.split(".");
    // 숫자가 아닌 문자 제거 후 포맷팅
    const formattedInteger = Number(
      integer.replace(/[^0-9]/g, "")
    ).toLocaleString("ko-KR");
    return decimal !== undefined
      ? `${formattedInteger}.${decimal}`
      : formattedInteger;
  }

  const numbers = stringVal.replace(/[^0-9]/g, "");
  if (!numbers) return "";
  return Number(numbers).toLocaleString("ko-KR");
};

/**
 * 문자열에서 숫자만 추출 (DB 저장용/계산용)
 * @param allowDecimal 소수점 포함 여부
 */
export const extractOnlyNumbers = (
  val: string,
  allowDecimal: boolean = false
): string => {
  if (allowDecimal) {
    return val.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
  }
  return val.replace(/[^0-9]/g, "");
};

/**
 * 상대적 날짜 표현 (30일 미만은 'n일 전', 이후는 날짜 표시)
 */
export function formatRelativeDate(date: string): string {
  const now = new Date();
  const propDate = new Date(date);
  const diffInMs = now.getTime() - propDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 30) {
    return diffInDays === 0 ? "오늘" : `${diffInDays}일 전`;
  } else {
    const year = propDate.getFullYear();
    const month = String(propDate.getMonth() + 1).padStart(2, "0");
    const day = String(propDate.getDate()).padStart(2, "0");
    const hours = String(propDate.getHours()).padStart(2, "0");
    const minutes = String(propDate.getMinutes()).padStart(2, "0");

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  }
}

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

export default dayjs.tz;

// ✅ 한국 휴대폰 번호 포맷 함수 (10자리, 11자리 둘 다 지원)
export function changeFormatKoPhoneNumber(digits: string) {
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length <= 10)
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
}

// 사업자등록증
export const changeBusinessNumber = (value: string): string => {
  const nums = value.replace(/[^\d]/g, "");
  if (nums.length <= 3) return nums;
  if (nums.length <= 5) return `${nums.slice(0, 3)}-${nums.slice(3)}`;
  return `${nums.slice(0, 3)}-${nums.slice(3, 5)}-${nums.slice(5, 10)}`;
};
