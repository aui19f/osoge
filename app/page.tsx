import Button from "@/components/forms/Button";
import MinHeader from "@/components/layout/MainHeader";
import MainIntro from "@/components/motion/MainIntro";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MinHeader />
      <div>
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[3/1] bg-[rgb(28,81,145)]">
          <Image src="/images/intro_01.jpg" alt="intro_osoge_01" fill />
          <div className="absolute w-full text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <h4 className="mb-2 text-4xl font-bold text-center text-[rgb(28,81,145)] md:text-6xl">
              오소게
            </h4>
            <p className="text-[rgb(28,81,145)] font-bold md:text-2xl">
              일에 더 집중할수 있는 환경을 제공합니다.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-12 my-16 text-center bg-gray-50 ">
          <p className="text-[rgb(28,81,145)] text-lg font-bold leading-8 break-keep whitespace-pre-wrap md:text-xl">
            스마트한 접수 시스템으로 빠르고 정확한 접수를 지원합니다. <br />
            고객은 실시간 상태 확인으로 투명한 소통을 경험하고, 사장님은
            대시보드 통계로 효율적인 운영이 가능합니다. <br />
            완료 메시지 자동 전송으로 업무 효율과 고객 만족도를 동시에 높이세요.
          </p>
        </div>

        <MainIntro />

        <div className="mt-12">
          <div className="relative w-80vw h-[40vw] bg-[rgb(210,220,233)]">
            <Image
              src="/images/illustration/intro_10.png"
              alt="문의하기"
              fill
            />
            <Link
              href="/apply"
              className="absolute bottom-8 left-16 md:left-[24%] md:bottom-16"
            >
              <div className="md:w-2xs [&>button]:w-full">
                <Button variant="secondary" sizes="lg">
                  <span className="text-xl">신청하기</span>
                </Button>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-gray-900 h-[20vh] flex">
          <div className="m-auto">
            <p className="text-sm text-center text-gray-200">㈜WOOPRO</p>
            <p className="text-center text-gray-200">
              사업자 등록번호 : 000-000-0000 | 대표 : 미스터리 우
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
