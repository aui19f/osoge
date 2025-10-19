import { getUser } from "@/app/actions/getUser";
import MenuItem from "@/components/layout/MenuItem";

export default async function MasterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getUser();
  const menu = [
    { label: "홈", icon: "", url: "/master" },
    { label: "리스트", icon: "", url: "/master/list" },
    { label: "검색", icon: "", url: "/master/search" },
    { label: "전송", icon: "", url: "/master/send" },
    { label: "설정", icon: "", url: "/master/setting" },
  ];
  if (user?.role !== "MASTER") {
    console.log("어드민 입장가능");
  }
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 p-2">{children}</main>
      <ul className="flex h-16 border-t border-t-white">
        {menu.map((item) => (
          <MenuItem key={item.url.replace("/", "")} {...item} />
        ))}
      </ul>
    </div>
  );
  // 여긴 레이아웃을 어떻게 해야하는걸까?? 인스타그램 형식이좋을가....
}
