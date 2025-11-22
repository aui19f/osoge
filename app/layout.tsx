import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { getUser } from "@/app/actions/getUser";
import HydrateUser from "@/components/hydrators/HydrateUser";
import RouteLoadingWatcher from "@/components/layout/RouteLoadingWatcher";
import RouteGuard from "@/components/hydrators/RouteGuard";

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
};

//RootLayout이 항상 서버에서 동적으로 렌더링되도록 설정
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getUser();

  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
      <meta name="apple-mobile-web-app-capable" content="yes" />

      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />

      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen h-screen bg-gray-100 dark:bg-gray-950`}
      >
        <HydrateUser initialUser={user} />
        <RouteGuard />
        <RouteLoadingWatcher />
        {children}
      </body>
    </html>
  );
}
