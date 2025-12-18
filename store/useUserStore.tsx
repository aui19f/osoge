import { typeUsers } from "@/app/actions/getUser";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  user: typeUsers | null; // users 테이블의 전체 정보
  isLoaded: boolean; // 초기 로딩 완료 여부
  isLoading: boolean; // 현재 로딩 중 여부
  error: string | null; // 에러 메시지
  setUser: (user: typeUsers) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void; // 로딩 상태 변경
  setError: (error: string | null) => void; // 에러 상태 변경
  markAsLoaded: () => void; // 로딩 완료 표시
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      // 초기 상태
      user: null,
      isLoaded: false,
      isLoading: false,
      error: null,

      // 사용자 데이터 설정
      setUser: (user) =>
        set({ user, isLoaded: true, isLoading: false, error: null }),

      // 사용자 데이터 초기화 (로그아웃 시)
      clearUser: () =>
        set({
          user: null,
          isLoaded: false,
          isLoading: false,
          error: null,
        }),
      setLoading: (loading) => set({ isLoading: loading }),
      // 에러 상태 변경
      setError: (error) =>
        set({
          error,
          isLoading: false,
        }),
      // 로딩 완료 표시
      markAsLoaded: () => set({ isLoaded: true }),
    }),
    {
      name: "user-storage",
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
      // @ts-expect-error - partialize는 부분 상태를 반환하지만 타입 정의가 엄격함
      partialize: (state) => ({
        userData: state.user,
        isLoaded: state.isLoaded,
      }),
    }
  )
);
