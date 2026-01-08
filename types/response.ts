export interface ApiResponse<T = unknown> {
  status: number; // HTTP 상태 코드 (200, 400, 500 등)
  message: string; // 사용자 친화적 메시지
  items?: T; // 실제 리턴되는 데이터 (객체 혹은 배열)
  error?: {
    // 시스템 에러 정보 (디버깅용)
    code: string;
    details?: unknown;
  };
}
