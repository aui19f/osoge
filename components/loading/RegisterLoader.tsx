// LoadingGif.js 또는 LoadingGif.tsx

import Button from "@/components/forms/Button";
import CountdownBar from "@/components/loading/ProgressBar";
import Image from "next/image";
import { useEffect } from "react";

interface RegisterLoaderProps {
  file: string;
  message?: string;
  duration?: number;
  isBtn?: boolean;
  onClose?: () => void;
}

export default function RegisterLoader({
  file,
  message,
  duration = 10000,
  isBtn = false,
  onClose,
}: RegisterLoaderProps) {
  useEffect(() => {
    // fade-out 끝나고 콜백 실행
    const closeTimer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => {
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col gap-4 bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="relative w-32 h-32">
          <Image
            src={`/images/gif/${file}.gif`}
            alt="종이 비행기 로딩 중..."
            fill={true}
            unoptimized={true}
          />
        </div>
        <div className="w-full h-4 px-8 my-8">
          <CountdownBar duration={duration} />
        </div>

        {message && (
          <p className="text-2xl font-bold text-gray-50">{message}</p>
        )}
      </div>
      <div className="w-full h-24 p-8 *:w-full">
        {isBtn && (
          <Button variant="secondary" onClick={onClose}>
            닫기
          </Button>
        )}
      </div>
    </div>
  );
}
