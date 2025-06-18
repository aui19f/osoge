import Image from "next/image";
import Link from "next/link";

type menu = {
  name: string;
  path: string;
  title?: string;
};
type menusType = {
  menus: menu[];
  pathname: string;
};
export default function MasterFooter({ menus, pathname }: menusType) {
  return (
    <footer className="flex h-20">
      {menus.map((item) => {
        // "/"는 정확히 일치해야만 홈으로 간주
        const isActive =
          item.path === "/master"
            ? pathname === "/master"
            : pathname.startsWith(item.path);
        return (
          <Link
            key={item.name}
            href={item.path}
            className="flex items-center justify-center flex-1 w-full"
          >
            <Image
              src={
                isActive
                  ? `/images/${item.name}_active.png`
                  : `/images/${item.name}.png`
              }
              alt={`${item.name} icon`}
              width={32}
              height={32}
            />
          </Link>
        );
      })}
    </footer>
  );
}
