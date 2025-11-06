"use client";
import LoadingLink from "@/components/layout/LoadingLink";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface ItemProps {
  label: string;
  icon: string;
  url: string;
}
export default function MenuItem(item: ItemProps) {
  const pathname = usePathname();
  const isActive = (path: string) => {
    if (path === "/master") {
      return pathname === "/master" || pathname === "";
    }
    return pathname.startsWith(path);
  };
  return (
    <li className="flex flex-col items-center justify-center flex-1">
      <LoadingLink href={item.url}>
        <div className="relative size-6">
          <Image
            src={`/images/icons/${
              isActive(item.url) ? item.icon + "_active" : item.icon
            }.png`}
            alt={item.label}
            fill
          />
        </div>
      </LoadingLink>
    </li>
  );
}
