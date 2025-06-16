import Link from "next/link";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ul>
        <li>회원관리</li>
        <li>
          <Link href={"admin/create-account"}>회원등록</Link>
        </li>
      </ul>
      <div>{children}</div>
    </div>
  );
}
