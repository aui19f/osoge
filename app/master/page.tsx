"use client";
import Button from "@/components/forms/Button";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Image from "next/image";

export default function Master() {
  dayjs.locale("ko");
  const pageMove = () => {
    window.location.href = "/master/register";
  };
  return (
    <article className="flex flex-col h-[calc(100vh-64px)]  bg-sky-600">
      <aside className="h-[34vh] flex items-center justify-center  flex-col py-8">
        <div className="flex flex-col items-center flex-1 gap-2">
          <div className="w-20 h-20 bg-white rounded-full"></div>
          <div className="*:text-gray-100 text-center">
            <h1 className="text-xl font-bold ">누벨 맞춤옷수선</h1>
            <p>프리미엄 사용 중</p>
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex flex-col items-center justify-center flex-1 gap-2">
            <Image
              src="/images/icons/play.png"
              width={24}
              height={24}
              alt="접수사용중"
            />
            <p className="text-gray-100">접수 </p>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 gap-2">
            <Image
              src="/images/icons/play.png"
              width={24}
              height={24}
              alt="접수사용중"
            />
            <p className="text-gray-100">라벨출력</p>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 gap-2">
            <Image
              src="/images/icons/play.png"
              width={24}
              height={24}
              alt="접수사용중"
            />
            <p className="text-gray-100">완료메시지</p>
          </div>

          {/* /Users/ssuzy/Downloads/pause.png /Users/ssuzy/Downloads/play.png /Users/ssuzy/Downloads/stop.png */}
        </div>
      </aside>
      <div className="flex flex-col flex-1 gap-4 px-4 pt-4 bg-gray-100 rounded-tl-2xl rounded-tr-2xl">
        <aside className="flex flex-col gap-2">
          <h3 className="text-xl font-bold">
            {dayjs().format("YYYY년 M월 D일 dddd")} 접수 현황
          </h3>
          <div className="w-full px-2 py-4 border-white rounded-md shadow-2xl bg-gray-50">
            <p className="text-4xl font-bold text-center ">00</p>
          </div>
        </aside>
        <aside className="flex flex-col gap-2">
          <h3 className="text-xl font-bold">3개월 상태현황</h3>
          <ul className="flex gap-2">
            <li className="flex-1 px-3 py-4 border-white rounded-md shadow-xl bg-gray-50">
              <p>접수</p>

              <p className="text-4xl font-bold text-center text-gray-600">00</p>
            </li>
            <li className="flex-1 px-3 py-4 border-white rounded-md shadow-xl bg-gray-50">
              <p>완료</p>
              <p className="text-4xl font-bold text-center text-gray-600">00</p>
            </li>
            <li className="flex-1 px-3 py-4 border-white rounded-md shadow-xl bg-gray-50">
              <p>취소</p>
              <p className="text-4xl font-bold text-center text-gray-600">00</p>
            </li>
          </ul>
        </aside>
        <div className="flex-1"></div>
        <div className="py-2 ">
          <Button variant="primary" className="w-full" onClick={pageMove}>
            접수 시작하기
          </Button>
        </div>
      </div>

      {/* <aside className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">
          {dayjs().format("YYYY년 M월 D일 dddd")}
        </h3>
        
      </aside>

      
      <aside className="flex flex-col gap-2 ">
       
      </aside> */}
    </article>
  );
}
