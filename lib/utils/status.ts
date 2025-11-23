import { EnumStatus } from "@prisma/client";

/**
 * EnumStatus 값을 한글로 변환합니다.
 * @param status 'READY' | 'COMPLETED' | 'CANCEL'
 * @returns '준비' | '완료' | '취소' 또는 빈 문자열
 */
export const getStatusKorean = (status: EnumStatus): string => {
  switch (status) {
    case "READY":
      return "준비";
    case "COMPLETED":
      return "완료";
    case "CANCEL":
      return "취소";
    default:
      return "";
  }
};
