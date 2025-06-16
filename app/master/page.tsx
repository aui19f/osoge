// import BarChart from "@/components/BarChart";

export default function pageHome() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="relative flex flex-col gap-1">
        <h2 className="text-xl font-bold">누벨맞춤옷수선</h2>
        <span className="absolute top-0 right-0 px-2 py-1 text-sm text-white rounded-md bg-sky-400">
          프리미엄
        </span>
        <p>경기 성남시 분당구 판교공원로5길 26-1 101호</p>
      </div>
      <div className="">
        <h2 className="text-xl font-bold">현황</h2>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col justify-center row-span-2 p-2 border border-gray-400 rounded-md *:font-bold *:text-blue-400">
            <p>오늘접수</p>
            <p className="text-4xl text-center">000</p>
          </div>

          <div className="h-20 p-2 bg-red-300 border border-red-300 rounded-md *:text-white *:font-bold">
            <p>접수</p>
            <p className="text-2xl text-center">000</p>
          </div>
          <div className="h-20 p-2 border border-blue-400 bg-blue-400 rounded-md *:text-white *:font-bold">
            <p>완료</p>
            <p className="text-2xl text-center">000</p>
          </div>
          <div className="h-20 p-2 border rounded-md  border-blue-400 *:font-bold *:text-blue-400">
            <p>합계</p>
            <p className="text-2xl text-center">000</p>
          </div>
          <div className="h-20 p-2 border border-slate-400 bg-slate-400 rounded-md *:text-white *:font-bold">
            <p>취소</p>
            <p className="text-2xl text-center">000</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <h2 className="text-xl font-bold">요일별 접수</h2>
        {/* <BarChart /> */}
      </div>
    </div>
  );
}
