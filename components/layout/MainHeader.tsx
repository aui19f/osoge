"use client";

import Button from "@/components/forms/Button";
import { useLoadingStore } from "@/store/useLoading";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function MinHeader() {
  const { user, status } = useUserStore();
  const router = useRouter();
  const { setLoading } = useLoadingStore();
  const [isVisible, setIsVisible] = useState(false);
  const handleLoginClick = () => {
    setLoading(true, "page");
    router.push("/login");
  };

  const serviceClick = () => {
    if (user?.role === "ADMIN") {
      router.replace("/admind"); //현재 페이지를 /login으로 대체하여 뒤로 가기를 할 경우 이전 페이지(현재 페이지)로 돌아오지 않음
    } else if (user?.role === "MASTER") {
      router.replace("/master");
    } else {
      alert("가입이 진행중입니다.");
    }
  };

  useEffect(() => {
    // 뷰포트 높이의 50%를 픽셀로 계산
    const threshold = window.innerHeight * 0.5;
    const handleScroll = () => {
      // 현재 스크롤 위치 (세로)
      const currentScrollPosition = window.scrollY;
      // 50vh를 초과하면 true, 아니면 false
      if (currentScrollPosition > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);
    // 컴포넌트 언마운트 시 리스너 제거 (클린업)
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때만 실행됨을 의미

  return (
    <header
      className={`
        fixed top-0 inset-x-0 z-50 
        h-16 w-full 
        transition-opacity duration-300 ease-in-out
        ${
          isVisible
            ? "bg-gray-800/40 pointer-events-auto" // 보일 때
            : "bg-gray-50/40 pointer-events-auto" // 숨길 때 (클릭 방지) opacity-0 pointer-events-none
        }
      `}
    >
      <nav className="flex items-center justify-end h-full px-8">
        {status === "idle" ? (
          <></>
        ) : user ? (
          <Button variant="primary" sizes="sm" onClick={serviceClick}>
            시작하기
          </Button>
        ) : (
          <Button variant="dark" sizes="sm" onClick={handleLoginClick}>
            로그인
          </Button>
        )}
      </nav>
    </header>
  );
}
