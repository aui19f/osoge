// components/common/LoadingLink.tsx
"use client";

import { useLoadingStore } from "@/store/useLoading";
import Link from "next/link";

export default function LoadingLink({
  href,
  children,
  ...props
}: React.ComponentProps<typeof Link>) {
  const { setLoading } = useLoadingStore();

  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        setLoading(true);
        props.onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}
