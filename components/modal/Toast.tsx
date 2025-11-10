import CountdownBar from "@/components/loading/ProgressBar";
import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}
export default function Toast({
  message = "TEST",
  duration = 3000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true); // 애니메이션 제어용

  useEffect(() => {
    // ✅ fade-in 시작
    setIsVisible(true);

    // fade-out 시작
    const fadeTimer = setTimeout(() => setIsVisible(false), duration - 500);

    // fade-out 끝나고 콜백 실행
    const closeTimer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  return (
    <div
      className={`fixed inset-0 top-0 bottom-0 z-50 flex items-center justify-center bg-black/40 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div
        className={`fixed bottom-1/2 left-1/2 -translate-x-1/2 px-6 py-6 rounded-xl shadow-lg
      bg-gray-800 text-white text-sm transition-all duration-500 ease-in-out flex flex-col gap-4
      `}
      >
        <CountdownBar duration={duration} />
        <p className="text-gray-200">{message}</p>
      </div>
    </div>
  );
}
