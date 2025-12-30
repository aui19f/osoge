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

export default function Navigation({ menus }: { menus: ItemProps[] }) {
  const { setLoading } = useLoadingStore();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (pathname === path) return true;
    return false;
  };

  return (
    <ul className="fixed bottom-0 left-0 right-0 flex h-16 bg-gray-100 border-t border-t-white dark:bg-gray-900 dark:border-t-black">
      {menus.map((menu) => (
        <li
          key={menu.url.replace("/", "")}
          className="flex items-center justify-center flex-1"
        >
          <Link
            href={menu.url}
            className="flex items-center justify-center"
            onClick={() => setLoading(true)}
            prefetch={false}
          >
            <Image
              src={`/images/icons/${
                isActive(menu.url) ? menu.icon + "_active" : menu.icon
              }.png`}
              alt={menu.label}
              width={24}
              height={24}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
