"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40">
      <div className="w-16 h-16 border-4 border-white rounded-full animate-spin border-t-transparent"></div>
    </div>
  );
}
