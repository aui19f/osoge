type itemsProps = {
  length: number;
};

export default function ItemListSkeleton({ length }: itemsProps) {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <li
          key={index}
          className="p-3 space-y-2 bg-white rounded-md shadow-sm animate-pulse"
        >
          <div className="w-20 h-6 ml-auto bg-gray-300 rounded" />
          <div className="w-1/2 h-6 bg-gray-300 rounded" />
          <div className="flex justify-between">
            <span className="w-16 h-4 bg-gray-300 rounded" />
            <span className="w-24 h-4 bg-gray-300 rounded" />
          </div>
          <div className="flex justify-between">
            <span className="w-16 h-4 bg-gray-300 rounded" />
            <span className="w-24 h-4 bg-gray-300 rounded" />
          </div>
        </li>
      ))}
      ;
    </>
  );
}
