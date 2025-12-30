// # 사업자 번호, 법인 번호, 업종 코드 등

// 사업자등록증
export const changeBusinessNumber = (value: string): string => {
  const nums = value.replace(/[^\d]/g, "");
  if (nums.length <= 3) return nums;
  if (nums.length <= 5) return `${nums.slice(0, 3)}-${nums.slice(3)}`;
  return `${nums.slice(0, 3)}-${nums.slice(3, 5)}-${nums.slice(5, 10)}`;
};
