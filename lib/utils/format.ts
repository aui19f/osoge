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
