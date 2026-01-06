/**
 * T: 성공 시 반환할 데이터의 타입 (객체 또는 배열)
 * E: 에러 발생 시 상세 에러 구조 (기본값은 string)
 */
export interface ServerActionResponse<T = unknown, E = string> {
  status: number;
  message?: string;
  items?: T; // 성공 데이터
  errors?: E; // 시스템 에러 또는 유효성 검사 에러
}
