"use client";

import Button from "@/components/forms/Button";
import MinHeader from "@/components/layout/MainHeader";

import Image from "next/image";

export default function Home() {
  const apply = () => {
    alert("구글폼/네이버폼으로 이동");
  };
  return (
    <>
      <MinHeader />

      <div>
        <div className="bg-[rgb(28,81,145)] h-[80vh] flex">
          <p className="m-auto text-center text-white">오소게 그림&이름</p>
        </div>

        <div className=" h-[40vh] flex flex-col items-center justify-center">
          <h4 className="mb-4 text-4xl font-bold text-center text-[rgb(28,81,145)]">
            오소게
          </h4>
          <p>간단한 소개글 작성</p>
        </div>

        <div className="flex flex-col gap-8 p-8 bg-white w-[80vw] h-[60vh] mx-auto">
          <div className="border border-[rgb(28,81,145)] p-8 rounded-lg">
            <div className="bg-[rgb(28,81,145)] inline-block py-1 px-2 rounded-md">
              <p className="text-white ">접수</p>
            </div>
          </div>
          <div className="border border-[rgb(28,81,145)] p-8 rounded-lg">
            <div className="bg-[rgb(28,81,145)] inline-block py-1 px-2 rounded-md">
              <p className="text-white ">상태리스트</p>
            </div>
          </div>
          <div className="border border-[rgb(28,81,145)] p-8 rounded-lg">
            <div className="bg-[rgb(28,81,145)] inline-block py-1 px-2 rounded-md">
              <p className="text-white ">완료 메시지 전달</p>
            </div>
          </div>
          <div className="border border-[rgb(28,81,145)] p-8 rounded-lg">
            <div className="bg-[rgb(28,81,145)] inline-block py-1 px-2 rounded-md">
              <p className="text-white ">통계</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="relative w-80vw h-[40vw] bg-[rgb(210,220,233)]">
            <Image src="/images/intro_10.png" alt="문의하기" fill />
            <div className="absolute flex flex-col gap-2 bottom-16 left-16">
              <h4 className="text-3xl">OSOGE</h4>
              <p>일에 더 집중할수 있는 환경을 제공합니다.</p>
              <Button onClick={apply}>신청하기</Button>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 h-[20vh] flex">
          <div className="m-auto">
            <p className="text-center text-gray-200">회사소개</p>
            <p className="text-center text-gray-200">sns등과같은 정보 나열</p>
          </div>
        </div>
      </div>
    </>
  );
}
