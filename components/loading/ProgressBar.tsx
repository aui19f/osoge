"use client";
import { useEffect, useState } from "react";

export default function CountdownBar({ duration }: { duration: number }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.max(100 - (elapsed / duration) * 100, 0);
      setProgress(percent);
    }, 50);

    const timer = setTimeout(() => {
      setProgress(0);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [duration]);

  return (
    <div className="w-full h-2 overflow-hidden bg-gray-600 rounded-full">
      <div
        className="h-full transition-all duration-100 ease-linear bg-lime-400"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
