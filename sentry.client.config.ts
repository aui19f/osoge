import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // Sentry 대시보드에서 확인한 DSN 주소
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // [짠테크 전략] 배포 환경에서만 활성화
  enabled: process.env.NODE_ENV === "production",

  // 성능 모니터링 샘플링 (무료 쿼터 절약을 위해 10%만 수집)
  tracesSampleRate: 0.1,

  // 세션 리플레이 (사용자 행동 녹화 기능 - 쿼터를 많이 먹으므로 필요 시 조절)
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  // 특정 도메인에서 오는 에러만 수집 (확장 프로그램 에러 방지)
  allowUrls: [/https?:\/\/osoge\.com/],
  // 민감 정보 보안 설정
  beforeSend(event) {
    // IP 주소 등 개인정보 제거 로직 추가 가능
    if (event.user) {
      delete event.user.ip_address;
    }
    return event;
  },
});
