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
      tags: { module },
      extra: {
        description: message,
        ...extra,
        systemMsg: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
    });
  }
};
