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
