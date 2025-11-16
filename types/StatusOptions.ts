// lib/status.ts

// @prisma/client에서 EnumStatus를 가져옵니다.
import { EnumStatus } from "@prisma/client";

// Enum 값(영문)을 한국어 레이블로 맵핑하는 객체
export const StatusLabels: Record<EnumStatus, string> = {
  [EnumStatus.READY]: "접수",
  // [EnumStatus.IN_PROGRESS]: "진행",
  [EnumStatus.COMPLETED]: "완료",
  [EnumStatus.CANCEL]: "취소",
};

export const StatusOptions = Object.keys(EnumStatus).map((key) => {
  const statusKey = key as EnumStatus;

  return {
    id: statusKey,
    label: StatusLabels[statusKey],
  };
});
