// providers/query-provider.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

/**
 * React Query Provider
 *
 * 역할:
 * - QueryClient 인스턴스 생성 및 제공
 * - 전역 캐싱 설정 관리
 * - 개발 도구 연동
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  // useState로 QueryClient를 생성하여 리렌더링 시에도 동일한 인스턴스 유지
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // --- 캐싱 전략 설정 ---

            // staleTime: 데이터가 "신선한" 상태로 유지되는 시간 (60초)
            // 이 시간 내에는 재요청하지 않고 캐시된 데이터 사용
            staleTime: 60 * 1000,

            // gcTime (Garbage Collection Time):
            // 사용하지 않는 캐시를 메모리에서 삭제하기까지의 시간 (5분)
            gcTime: 5 * 60 * 1000,

            // refetchOnWindowFocus:
            // 브라우저 탭을 다시 포커스할 때 자동으로 데이터 갱신 (비활성화)
            // 무료 플랜에서는 불필요한 요청 방지를 위해 false 권장
            refetchOnWindowFocus: false,

            // refetchOnMount:
            // 컴포넌트가 마운트될 때 데이터 재요청 여부
            // true (기본값): 항상 재요청
            // false: 캐시가 있으면 재요청 안함
            // 'always': 캐시 무시하고 항상 재요청
            refetchOnMount: true,

            // refetchOnReconnect:
            // 네트워크가 재연결될 때 자동 갱신 여부
            refetchOnReconnect: false,

            // retry: 실패 시 재시도 횟수
            // 무료 플랜에서는 1회로 제한하여 불필요한 요청 방지
            retry: 1,

            // retryDelay: 재시도 간격 (밀리초)
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000),
          },

          mutations: {
            // mutation 실패 시 재시도 안함 (POST, PUT, DELETE 등)
            retry: 0,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* 개발 환경에서만 React Query DevTools 표시 */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
