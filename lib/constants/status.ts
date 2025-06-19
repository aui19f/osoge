export enum EnumNextStatus {
  READY = "READY",
  COMPLETED = "COMPLETED",
  CANCEL = "CANCEL",
}

export const statusLabels: Record<EnumNextStatus, string> = {
  [EnumNextStatus.READY]: "접수",
  [EnumNextStatus.COMPLETED]: "완료",
  [EnumNextStatus.CANCEL]: "취소",
};

export const statusSelectOptions = Object.values(EnumNextStatus).map(
  (status) => ({
    id: status,
    label: statusLabels[status],
  })
);
