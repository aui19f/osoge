export default function ListItemSkeleton({ count }: { count: number }) {
  return (
    <ul>
      {Array(count)
        .fill(0)
        .map((x) => (
          <li
            key={x}
            className="relative flex flex-col gap-2 px-2 py-4 border-b border-b-gray-200"
          >
            <div className="flex gap-2 ">
              <div className="flex-1 h-6 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded-md flex-3 animate-pulse"></div>
            </div>
            <div className="flex gap-2 ">
              <div className="flex-1 h-6 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded-md flex-3 animate-pulse"></div>
            </div>
          </li>
        ))}
    </ul>
  );
}
