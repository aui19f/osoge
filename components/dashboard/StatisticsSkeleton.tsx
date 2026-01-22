export default function StatisticsSkeleton() {
  return (
    <aside className="flex flex-col gap-2 animate-pulse">
      <div className="w-32 mb-1 rounded-md h-7 bg-white/10" />
      <ul className="grid w-full max-w-md grid-cols-2 gap-4 mx-auto">
        {[1, 2, 3, 4].map((i) => (
          <li
            key={i}
            className="relative flex items-center justify-center aspect-square"
          >
            <div className="absolute inset-0 bg-white/5 rounded-3xl blur-2xl" />

            <div className="relative flex flex-col items-center justify-center w-full h-full gap-3 py-4 overflow-hidden border bg-white/5 backdrop-blur-xl rounded-3xl border-white/20">
              <div className="w-16 h-3 rounded-full bg-white/10" />
              <div className="w-20 h-10 bg-white/20 rounded-xl" />
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
