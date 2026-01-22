// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // [짠테크] 배포 환경에서만 활성화 (필수)
  enabled: process.env.NODE_ENV === "production",
  // 성능 모니터링 샘플링 (필수)
  tracesSampleRate: 0.1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
  // 특정 도메인에서 오는 에러만 수집 (확장 프로그램 에러 방지)
  allowUrls: [/https?:\/\/osoge\.com/],
  // 서버 에러에서도 민감 정보를 가리고 싶다면 포함 (권장)
  beforeSend(event) {
    if (event.user) {
      delete event.user.ip_address;
    }
    return event;
  },
});
