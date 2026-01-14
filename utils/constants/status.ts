// lib/status.ts

// @prisma/client에서 EnumStatus
import { EnumStatus } from "@prisma/client";

// 상태별 한국어 레이블 매핑
export const STATUS_LABELS: Record<EnumStatus, string> = {
  [EnumStatus.READY]: "접수",
  [EnumStatus.PROGRESS]: "진행",
  [EnumStatus.COMPLETED]: "완료",
  [EnumStatus.CANCEL]: "취소",
};

export const STATUS_OPTIONS = Object.keys(EnumStatus).map((key) => {
  const statusKey = key as EnumStatus;
  return {
    id: statusKey,
    label: STATUS_LABELS[statusKey],
  };
});

// 상태 한글로 출력하기
export const printStatusLabel = (status: string | EnumStatus) => {
  return STATUS_LABELS[status as EnumStatus] || status;
};

//상태별 색상 매핑
export const STATUS_COLORS: Record<EnumStatus, string> = {
  [EnumStatus.READY]: "bg-red-400 text-white border-red-400",
  [EnumStatus.PROGRESS]: "bg-green-400 text-white border-green-400",
  [EnumStatus.COMPLETED]: "bg-blue-400 text-white border-blue-400",
  [EnumStatus.CANCEL]: "bg-slate-400 text-white border-slate-400",
};
