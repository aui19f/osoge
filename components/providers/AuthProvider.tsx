"use client";

import { typeUsers } from "@/app/actions/getLoginUser";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

export function AuthProvider({ initialUser }: { initialUser: typeUsers }) {
  const userId = initialUser?.id;
  const { user, setUser, setLoginLoading } = useUserStore();

  useEffect(() => {
    if (!userId) {
      setUser(null);
      return;
    }
    if (user?.id === userId) return;
    setLoginLoading();
    setUser(initialUser);
  }, [user?.id, userId, initialUser, setUser, setLoginLoading]);

  return <></>;
}
