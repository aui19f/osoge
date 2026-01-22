// utils/error.ts
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return String(error);
};

// 사용자 입력 실수(비즈니스 에러)인지 판별하는 리스트
const LOGIN_EXPECTED_ERROR_MESSAGES = [
  "Invalid login credentials",
  "Email not confirmed",
  "User already exists",
];

export const isExpectedError = (error: unknown): boolean => {
  const message = getErrorMessage(error);
  return LOGIN_EXPECTED_ERROR_MESSAGES.some((msg) => message.includes(msg));
};
