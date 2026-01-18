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
});
