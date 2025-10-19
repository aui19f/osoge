import MenuItem from "@/components/layout/MenuItem";

export default async function MasterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const menu = [
    { label: "홈", icon: "", url: "/master" },
    { label: "리스트", icon: "", url: "/master/list" },
    { label: "검색", icon: "", url: "/master/search" },
    { label: "전송", icon: "", url: "/master/send" },
    { label: "설정", icon: "", url: "/master/setting" },
  ];

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 px-2 pt-2 pb-18">{children}</main>
      <ul className="fixed bottom-0 left-0 right-0 flex h-16 bg-gray-100 border-t border-t-white">
        {menu.map((item) => (
          <MenuItem key={item.url.replace("/", "")} {...item} />
        ))}
      </ul>
    </div>
  );
  // 여긴 레이아웃을 어떻게 해야하는걸까?? 인스타그램 형식이좋을가....
}
