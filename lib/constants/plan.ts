export enum EnumNextPlan {
  BASICS = "BASICS", //  접수만 가능 (문자 보내기X)
  PLUS = "PLUS", // 접수 , 출력 가능
  PREMIUM = "PREMIUM", // 접수, 출력, 문자 모두 가능
}

export const planLabel = {
  [EnumNextPlan.BASICS]: "기본",
  [EnumNextPlan.PLUS]: "플러스",
  [EnumNextPlan.PREMIUM]: "프리미엄",
};

export const planOptions = Object.values(EnumNextPlan).map((x) => ({
  id: x,
  label: planLabel[x],
}));
