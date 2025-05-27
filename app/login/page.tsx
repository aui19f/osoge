import Image from "next/image";
import Link from "next/link";

export default async function CreateAccont() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-sky-800">
      <div className="px-4 py-12 bg-white rounded-md shadow-sm shadow-gray-50">
        <div className="flex items-end">
          <Image
            src="/images/logo_main.png"
            alt="logo"
            width={72}
            height={72}
          />
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-sky-800">
              TRACKCEIPT LOGIN
            </h2>
            <p className="text-sm text-sky-800">어서오게</p>
          </div>
        </div>

        <form action="" className="flex flex-col gap-4 my-4 w-96">
          <input type="text" placeholder="이메일" />
          <input type="password" placeholder="비밀번호" />

          <button className="bg-sky-400 text-gray-50 border-sky-400">
            로그인
          </button>
        </form>
        <div className="text-right text-sky-800">
          <Link href="admin-send ">사용 문의하기</Link>
        </div>
      </div>
    </div>
  );
}
