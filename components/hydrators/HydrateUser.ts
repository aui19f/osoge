"use client";
import { typeUsers } from "@/app/actions/getUser";
import db from "@/lib/db";
import { supabase } from "@/lib/supabase/clinet";

import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

interface userProps {
  initialUser: typeUsers | null;
}
export default function HydrateUser({ initialUser }: userProps) {
  const { setUser } = useUserStore();
  // SSR 초기값을 Zustand에 세팅
  useEffect(() => {
    setUser(initialUser);
  }, [initialUser, setUser]);

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (_event === "SIGNED_IN") {
          const data = await db.users.findUnique({
            where: { id: session?.user.id },
          });
          setUser(data);
        } else if (_event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, [setUser]);

  return null;
}
