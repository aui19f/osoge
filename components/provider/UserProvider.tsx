"use client";

import { useEffect } from "react";
import { IUser, useUserStore } from "@/store/useUserStore";

interface Props {
  user: IUser | null;
  children?: React.ReactNode;
}

export default function UserProvider({ user, children }: Props) {
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  return <>{children}</>;
}
