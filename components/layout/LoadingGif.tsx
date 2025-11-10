// LoadingGif.js 또는 LoadingGif.tsx

import CountdownBar from "@/components/loading/ProgressBar";
import Image from "next/image";
import { useEffect } from "react";

interface LoadingGifProps {
  file: string;
  message?: string;
  duration?: number;
  onClose: () => void;
}

export default function LoadingGif({
  file,
  message,
  duration = 10000,
  onClose,
}: LoadingGifProps) {
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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/40 backdrop-blur-sm">
      <div className="relative w-32 h-32">
        {/* GIF 파일 삽입 */}
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

      {message && <p className="text-2xl font-bold text-gray-50">{message}</p>}
    </div>
  );
}
