import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import LoaderRenderer from "@/components/loading/LoaderRenderer";
// import { getUserFromToken } from "@/lib/auth/getUserFromToken";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { getUserFromToken } from "@/lib/auth/getUserFromToken";
import { AuthProvider } from "@/components/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "어서오게 #OSOGE",
  description: "접수시스템",
  themeColor: "#3b82f6",
  metadataBase: new URL("https://osoge.vercel.app"),
  openGraph: {
    title: "어서오게 #OSOGE",
    description: "스마트한 접수 시스템",
    url: "https://osoge.vercel.app", // 실제 서비스 URL
    siteName: "OSOGE",
    images: [
      {
        url: "/images/background/apply_2000.jpg", // public 폴더 기준 경로
        width: 1200,
        height: 630,
        alt: "어서오게 서비스 메인 썸네일",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "어서오게 #OSOGE",
    description: "접수시스템",
    images: ["/images/background/apply_2000.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/images/osoge_main_01.png",
  },
};

//RootLayout이 항상 서버에서 동적으로 렌더링되도록 설정
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // JWT 토큰에서 사용자 정보 추출 (DB 호출 없음)
  const user = await getUserFromToken();

  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
      <meta name="apple-mobile-web-app-capable" content="yes" />

      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />

      {/* iOS 홈화면 아이콘 */}
      <link rel="apple-touch-icon" href="/images/osoge_main_01.png" />

      {/* iOS 스플래시 이미지 */}
      <link rel="apple-touch-startup-image" href="/images/splash.png" />

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen h-screen bg-gray-100 dark:bg-gray-950`}
      >
        {/* 
          <AuthProvider initialUser={user}>
            
            {children}
          </AuthProvider>
        
      */}
        <QueryProvider>
          <LoaderRenderer />
          {children}
          <AuthProvider initialUser={user} />
        </QueryProvider>
      </body>
    </html>
  );
}
