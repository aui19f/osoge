import { EnumStatus } from "@prisma/client";

// 핸드폰번호
export const formatPhone = (phone: string): string => {
  // 숫자만 추출
  const numbers = phone.replace(/[^0-9]/g, "");

  // 길이에 따라 포맷팅
  if (numbers.length === 11) {
    // 010-0000-0000
    return numbers.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  } else if (numbers.length === 10) {
    return numbers.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }

  // 포맷팅할 수 없으면 원본 반환
  return phone;
};

// 숫자 포맷팅 (콤마 추가)
export const formatNumber = (
  val: string | number,
  allowDecimal: boolean = false
): string => {
  if (val === "" || val === null || val === undefined) return "";

  const stringVal = String(val);

  if (allowDecimal) {
    const [integer, decimal] = stringVal.split(".");
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

// 숫자만 추출
export const extractNumber = (
  val: string,
  allowDecimal: boolean = false
): string => {
  if (allowDecimal) {
    return val.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
  }
  return val.replace(/[^0-9]/g, "");
};
