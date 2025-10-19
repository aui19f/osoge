import LoadingLink from "@/components/layout/LoadingLink";

import Image from "next/image";

interface ItemProps {
  label: string;
  // icon: string;
  url: string;
}
export default function MenuItem(item: ItemProps) {
  return (
    <li className="flex flex-col items-center justify-center flex-1">
      <LoadingLink href={item.url}>
        <div className="relative">
          {/* <Image src={item.icon} alt={item.label} fill /> */}
        </div>
        <p>{item.label}</p>
      </LoadingLink>
    </li>
  );
}
