import * as Sentry from "@sentry/nextjs";

interface LogContext {
  module: string; // 기능 단위 (예: 'login', 'db-query')
  message: string; // 에러 상황에 대한 요약 설명
  extra?: Record<string, unknown>; // 추가 데이터 (비밀번호 등 민감정보 제외)
}

export const logError = (error: unknown, context: LogContext): void => {
  const { module, message, extra } = context;

  if (process.env.NODE_ENV === "development") {
    console.group(`🔴 [Error - ${module}] ${message}`);
    console.error("System Error:", error);
    if (extra) {
      console.log("Extra Data:");
      console.table(extra);
    }
    console.groupEnd();
    return;
  }

  if (process.env.NODE_ENV === "production") {
    Sentry.captureException(error, {
      //태그: 대시보드에서 필터링할 때 사용 (module별 분류)
      tags: { module },
      // 컨텍스트: 에러와 관련된 상세 정보를 그룹화하여 저장
      contexts: {
        context_info: {
          description: message,
          ...extra,
        },
      },
      //추가 데이터: 시스템 메시지나 스택 트레이스 등
      extra: {
        systemMsg: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
    });
  }
};
