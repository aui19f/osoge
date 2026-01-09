export default function Loading() {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 ">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white opacity-30 dark:bg-black backdrop-blur-sm">
        <div className="w-10 h-10 border-4 border-blue-400 rounded-full animate-spin border-t-transparent" />
      </div>
    </div>
  );
}
