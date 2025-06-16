export enum EnumStatus {
  READY = "READY",
  COMPLETED = "COMPLETED",
  CANCEL = "CANCEL",
}

export const statusLabels: Record<EnumStatus, string> = {
  [EnumStatus.READY]: "접수",
  [EnumStatus.COMPLETED]: "완료",
  [EnumStatus.CANCEL]: "취소",
};
