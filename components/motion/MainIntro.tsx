"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

// 1. 데이터를 컴포넌트 외부에 선언 (성능상 가장 유리하며 clean함)
const INTRO_CONTENTS = [
  {
    id: "intro-01",
    title: "접수",
    desc: "빠르고 정확한 접수로 스마트한 운영을 지원합니다.",
    icon: "/images/icons/intro_01.png",
  },
  {
    id: "intro-02",
    title: "상태리스트",
    desc: (
      <>
        실시간 상태 업데이트로 고객은 빠르고 투명한 소통을 경험하며,
        <br />
        신뢰와 만족도가 높아집니다.
      </>
    ),
    icon: "/images/icons/intro_02.png",
  },
  {
    id: "intro-03",
    title: "완료 메시지 전달",
    desc: (
      <>
        접수번호 검색 후 버튼 클릭 한 번으로 즉시 전송됩니다. <br />
        고객은 담당 날짜와 장소까지 정확히 확인할 수 있습니다.
      </>
    ),
    icon: "/images/icons/intro_03.png",
  },
  {
    id: "intro-04",
    title: "통계",
    desc: "실시간 대시보드로 접수 현황을 한눈에 파악해 업무 효율을 극대화하세요.",
    icon: "/images/icons/intro_01.png",
  },
];

// 2. 애니메이션 설정 외부 선언
const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 30 },

  visible: {
    opacity: 1,

    y: 0,

    transition: {
      duration: 0.8,

      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function MainIntro() {
  return (
    <ul className="space-y-16 p-8 bg-white w-[80vw] mx-auto md:w-4xl md:space-y-24">
      {INTRO_CONTENTS.map((item) => (
        <motion.li
          key={item.id}
          variants={ITEM_VARIANTS}
          initial="hidden"
          whileInView="visible" // 이 컴포넌트가 화면에 들어오면 실행
          viewport={{
            once: true, // 다시 올라갔다 내려올 때 또 실행되지 않도록 (애플 방식)
            amount: 0.2, // 요소의 20%가 화면에 보일 때 애니메이션 시작
            margin: "-50px", // 화면 하단 경계선보다 50px 안쪽으로 들어왔을 때 트리거
          }}
        >
          <div className="relative w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24">
            <Image
              src={item.icon}
              fill
              alt={item.title}
              className="object-contain"
            />
          </div>

          <p className="text-[rgb(28,81,145)] text-2xl font-bold md:text-4xl">
            {item.title}
          </p>

          <div className="text-gray-700 md:text-xl">{item.desc}</div>
        </motion.li>
      ))}
    </ul>
  );
}
