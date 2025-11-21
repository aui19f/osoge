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
        <div className="bg-[rgb(28,81,145)] h-[32vh] flex relative md:h-100vw">
          <Image src="/images/intro_01.jpg" alt="intro_osoge_01" fill />
          <div className="absolute w-full text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <h4 className="mb-2 text-4xl font-bold text-center text-[rgb(28,81,145)]">
              오소게
            </h4>
            <p className="text-[rgb(28,81,145)] font-bold">
              일에 더 집중할수 있는 환경을 제공합니다.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-12 my-16 text-center bg-gray-50 ">
          <p className="text-[rgb(28,81,145)] text-lg font-bold leading-8 break-keep whitespace-pre-wrap">
            스마트한 접수 시스템으로 빠르고 정확한 접수를 지원합니다. <br />
            고객은 실시간 상태 확인으로 투명한 소통을 경험하고, 사장님은
            대시보드 통계로 효율적인 운영이 가능합니다. <br />
            완료 메시지 자동 전송으로 업무 효율과 고객 만족도를 동시에 높이세요.
          </p>
        </div>

        <ul className="flex flex-col gap-16 p-8 bg-white w-[80vw] mx-auto">
          <li className="flex flex-col gap-4">
            <Image
              src="/images/icons/intro_01.png"
              width={64}
              height={64}
              alt="접수"
            />

            <p className="text-[rgb(28,81,145)] text-2xl font-bold">접수</p>

            <p>빠르고 정확한 접수로 스마트한 운영을 지원합니다.</p>
          </li>
          <li className="flex flex-col gap-4">
            <Image
              src="/images/icons/intro_02.png"
              width={64}
              height={64}
              alt="상태리스트"
            />

            <p className="text-[rgb(28,81,145)] text-2xl font-bold">
              상태리스트
            </p>

            <p>
              실시간 상태 업데이트로 고객은 빠르고 투명한 소통을 경험하며,
              <br />
              신뢰와 만족도가 높아집니다.
            </p>
          </li>
          <li className="flex flex-col gap-4">
            <Image
              src="/images/icons/intro_03.png"
              width={64}
              height={64}
              alt="완료메시지_전달"
            />

            <p className="text-[rgb(28,81,145)] text-2xl font-bold">
              완료 메시지 전달
            </p>

            <p>
              접수번호 검색 후 버튼 클릭 한 번으로 즉시 전송됩니다. <br />
              고객은 담당 날짜와 장소까지 정확히 확인할 수 있습니다.
            </p>
          </li>

          <li className="flex flex-col gap-4">
            <Image
              src="/images/icons/intro_01.png"
              width={64}
              height={64}
              alt="통계"
            />
            <p className="text-[rgb(28,81,145)] text-2xl font-bold">통계</p>
            <p>
              실시간 대시보드로 접수 현황을 한눈에 파악해 업무 효율을
              극대화하세요.
            </p>
          </li>
        </ul>

        <div className="mt-12">
          <div className="relative w-80vw h-[40vw] bg-[rgb(210,220,233)]">
            <Image src="/images/intro_10.png" alt="문의하기" fill />
            <div className="absolute flex flex-col gap-2 bottom-16 left-16">
              <Button variant="light" onClick={apply}>
                신청하기
              </Button>
            </div>
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
