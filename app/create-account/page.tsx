import Image from "next/image";

export default async function CreateAccont() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image
        src="/images/logo_main.png"
        alt="logo"
        width={120}
        height={120}
        className="mb-6"
      />

      <form action="" className="flex flex-col gap-4 p-4 w-96">
        <input type="text" placeholder="이메일" />
        <input type="password" placeholder="비밀번호" />
        <input type="password" placeholder="비밀번호확인" />
        <input type="text" placeholder="사업자명" />
        <input type="text" placeholder="사업자번호" />
        <button className="bg-sky-400 text-gray-50 border-sky-400">
          회원가입완료
        </button>
      </form>
    </div>
  );
}
