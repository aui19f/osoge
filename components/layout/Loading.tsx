export default function Loading() {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 ">
      <div className="fixed inset-0 flex items-center justify-center opacity-30 bg-white dark:bg-black backdrop-blur-sm z-[9999]">
        <div className="w-10 h-10 border-4 border-gray-400 rounded-full animate-spin border-t-transparent" />
      </div>
    </div>
  );
}
