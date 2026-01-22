// next.config.js
import withPWAInit from "next-pwa";
import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// 1️⃣ 기본 Next.js 설정
const nextConfig: NextConfig = {
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

// 2️⃣ PWA 설정
const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: !isProd, // ✅ 개발 환경에서는 비활성화
});

// 3️⃣ Sentry + PWA 함께 적용
export default withSentryConfig(withPWA(nextConfig), {
  org: "study-lf",
  project: "osoge",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  // disableLogger: true,
  // automaticVercelMonitors: true,
  // 💡 핵심 보안 옵션:
  // 빌드 후 소스 맵을 삭제하여 외부 노출을 차단합니다.
  sourcemaps: {
    // 빌드 후 생성된 소스 맵을 삭제하여 클라이언트에 노출되지 않게 함 (보안)
    deleteSourcemapsAfterUpload: true,
  },
  // 에러 발생 시 React 컴포넌트 이름을 더 정확하게 보여줍니다.
  reactComponentAnnotation: { enabled: true },
});
