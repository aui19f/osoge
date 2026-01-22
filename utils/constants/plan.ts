// types/plan.ts (또는 해당 컴포넌트 파일 상단)

// 1. 유입될 수 있는 ID 값들을 타입으로 정의 (선택 사항이지만 안전함)
// 만약 DB의 ID가 고정적이라면 연합 타입으로 정의하고, 아니면 string을 사용합니다.
export type PlanId = string;

// 2. Plan 레이블을 위한 Record 생성
export const PLAN_LABELS: Record<PlanId, string> = {
  "free-plan-uuid": "무료 플랜",
  "basic-plan-uuid": "베이직 플랜",
  "ae524538-9401-4e9f-b786-316125c9b248": "프리미엄",
};

export const printPlanLabel = (planId: string | PlanId) => {
  return PLAN_LABELS[planId] || planId;
};
