export default function ModalSkeleton() {
  return (
    <>
      <div className="flex items-center gap-2.5 p-4 bg-gray-100 relative border-b border-b-gray-300">
        <div className="flex-1 h-6 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex-1 h-6 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="flex-1 h-6 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="flex-1 h-6 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="flex-1 h-6 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="flex-1 h-6 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
      <div className="flex items-center justify-end gap-2 p-4 border-t border-t-gray-300 ">
        <div className="flex-1 h-6 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="flex-1 h-6 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </>
  );
}
