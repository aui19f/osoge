// components/common/FacebookLoader.tsx

export default function DoubleLoader() {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-gray-800/60 ">
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <div className="flex items-center justify-center w-24 h-24 text-blue-400 border-4 border-transparent rounded-full animate-spin border-t-blue-400">
          <div className="flex items-center justify-center w-20 h-20 text-red-400 border-4 border-transparent rounded-full animate-spin border-t-red-400"></div>
        </div>
      </div>
    </div>
  );
}
