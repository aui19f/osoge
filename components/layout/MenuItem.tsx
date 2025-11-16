"use client";

import { useLoadingStore } from "@/store/useLoading";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ItemProps {
  label: string;
  icon: string;
  url: string;
}
export default function MenuItem(item: ItemProps) {
  const { setLoading } = useLoadingStore();
  const pathname = usePathname();
  const isActive = (path: string) => {
    if (path === "/master") {
      return pathname === "/master" || pathname === "";
    }
    return pathname.startsWith(path);
  };
  return (
    <li className="flex items-center justify-center flex-1">
      <Link
        href={item.url}
        className="flex items-center justify-center"
        onClick={() => setLoading(true)}
      >
        <Image
          src={`/images/icons/${
            isActive(item.url) ? item.icon + "_active" : item.icon
          }.png`}
          alt={item.label}
          width={24}
          height={24}
        />
      </Link>
    </li>
  );
}
