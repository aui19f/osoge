import { formatPhoneNumber } from "@/utils/formatter/phone";

export function highlightPhone(phone: string, search: string) {
  const formatted = formatPhoneNumber(phone); // 01012345678 → "010-1234-5678"
  const numbersOnly = formatted.replace(/[^0-9]/g, "");
  const searchNumbers = search.replace(/[^0-9]/g, "");

  //검색 숫자가 실제 전화번호의 어디에 있는지 시작위치를 찾기
  const startIndex = numbersOnly.indexOf(searchNumbers);
  if (startIndex === -1) {
    return <span>{formatted}</span>;
  }

  let numCount = 0;
  let realStart = -1;
  let realEnd = -1;

  for (let i = 0; i < formatted.length; i++) {
    if (/[0-9]/.test(formatted[i])) {
      //숫자인지 확인
      if (numCount === startIndex) realStart = i;
      if (numCount === startIndex + searchNumbers.length - 1) {
        realEnd = i + 1;
        break;
      }
      numCount++;
    }
  }

  return (
    <>
      <span>{formatted.substring(0, realStart)}</span>
      <span className="px-1 font-bold text-red-400 bg-red-50">
        {formatted.substring(realStart, realEnd)}
      </span>
      <span>{formatted.substring(realEnd)}</span>
    </>
  );
}
