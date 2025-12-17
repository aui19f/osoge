// 비밀번호 관련 (기존 코드)
export const PASSWORD_COMPLEX_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_@])[A-Za-z\d-_@]{12,20}$/;
export const PASSWORD_SIMPLE_REGEX =
  /^(?=.*[a-z])(?=.*\d)(?=.*[-_@])[a-z\d-_@]{12,20}$/;

// 하이픈, 공백 없이 숫자만: 01X-XXX(X)-XXXX 또는 0X-XXX(X)-XXXX
export const PHONE_REGEX_KO =
  /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$|^0[2-9]\d{0,1}-?\d{3,4}-?\d{4}$/; // 단순화된 버전 (참고)

// 01로 시작, 다음 자리는 0, 1, 6, 7, 8, 9 중 하나, 이후 7자리 또는 8자리 숫자
export const OUTPUT_PHONE_REGEX = /(\d{3})(\d{4})(\d{4})/;

// 전화번호 포맷팅 관련
export const PHONE_11_DIGIT_REGEX = /(\d{3})(\d{4})(\d{4})/; // 010-0000-0000
export const PHONE_10_DIGIT_REGEX = /(\d{3})(\d{3})(\d{4})/; // 010-000-0000
