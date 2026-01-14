import { typeUsers } from "@/app/actions/getLoginUser";
import { create } from "zustand";

type AuthStatus =
  | "idle" // 아직 아무것도 안 한 상태
  | "loading" // 유저 확인 중
  | "auth" // 로그인 완료 (authenticated)
  | "unauth" //로그인 안 됨 (unauthenticated)
  | "error"; //에러

type UserStore = {
  user: typeUsers | null; // users 테이블의 전체 정보
  status: AuthStatus;
  error: string | null; // 에러 메시지
  setLoginLoading: () => void;
  setUser: (user: typeUsers | null) => void;
  setLoginError: (error: string | null) => void;
  setLoginReset: () => void;
};

export const useUserStore = create<UserStore>()((set) => ({
  // 초기 상태
  user: null,
  status: "idle",
  error: null,
  setLoginLoading: () =>
    set({
      status: "loading",
      error: null,
    }),
  setUser: (user) =>
    set({
      user,
      status: user ? "auth" : "unauth",
      error: null,
    }),
  setLoginError: (message) =>
    set({
      status: "error",
      error: message,
    }),
  setLoginReset: () =>
    set({
      user: null,
      status: "idle",
      error: null,
    }),
}));
