"use client";
import Loading from "@/components/loading/DefaultLoading";
import DoubleLoader from "@/components/loading/DoubleLoader";
import { useLoadingStore } from "@/store/useLoading";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function LoaderRenderer() {
  const pathname = usePathname();
  const { type, isLoading, setLoading } = useLoadingStore();

  useEffect(() => {
    // 경로가 바뀌면 로딩 종료
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (isLoading) {
    if (type === "page") return <DoubleLoader />;
    if (type === "") return <Loading />;
  }

  return null;
}
