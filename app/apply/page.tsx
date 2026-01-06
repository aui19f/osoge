import ApplyForm from "@/app/apply/ApplyForm";
import Image from "next/image";
import Link from "next/link";
export default function Apply() {
  return (
    <div className="flex flex-col items-center w-full h-screen gap-2 p-4 overflow-auto">
      <Image
        src="/images/background/office_620822_1280.jpg"
        fill={true}
        alt="신청서"
        style={{
          objectFit: "cover",
        }}
      />

      <div className="z-20 py-4 space-y-4 text-center">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 cursor-pointer"
        >
          <Image
            src="/images/osoge_main_01.png"
            width={32}
            height={32}
            alt="osoge"
          />
          <h2 className="text-2xl font-bold text-white">오소게</h2>
        </Link>
        <p className=" text-gray-50">
          귀사의 성공적인 도입을 위한 <br />
          최적의 솔루션을 상담해 드립니다.
        </p>
      </div>
      <ApplyForm />
    </div>
  );
}
