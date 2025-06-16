"use client";

// import getItems from "@/app/master/[id]/actions";
// import SendCheck from "@/components/modals/sendChack";
// import { EnumStatus } from "@/lib/constants/status";

// import { formatRelativeDate } from "@/lib/utils";
import { useEffect } from "react"; //useState

//{ params }: { params: { id: string } }
export default function Details() {
  // const [detailStatus, setDetailStatus] = useState(EnumStatus.READY);
  // const [items, setItems] = useState();

  const fetchGetItems = async () => {
    // const { id } = params;
    // const result = await getItems(id);
    // setItems(result);
  };
  // const statusLabels: Record<EnumStatus, string> = {
  //   [EnumStatus.READY]: "접수",
  //   [EnumStatus.COMPLETED]: "완료",
  //   [EnumStatus.CANCEL]: "취소",
  // };

  // const chnageStatus = (status: EnumStatus) => {
  //   console.log("[status] ", status);
  // };
  useEffect(() => {
    fetchGetItems();
  }, []);
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col gap-2.5 p-3 [&>div]:flex [&>div]:p-2 [&>div>p]:text-lg flex-1">
        <div>
          <p className="w-24 text-lg ">접수일</p>
          <p>YYYY/MM/DD (AM)00:00</p>
        </div>

        <div>
          <p className="w-24 text-lg ">연락처</p>
          <p>000-0000-0000</p>
        </div>

        <div>
          <p className="w-24 text-lg ">상태</p>
          {/* <ul className="flex items-center flex-1">
            {Object.values(EnumStatus).map((status, index) => (
              <li
                key={status}
                onClick={() => chnageStatus(status)}
                className={`flex-1 h-12 flex items-center justify-center ${
                  status === detailStatus
                    ? "bg-blue-400 text-blue-50"
                    : "text-slate-400 bg-slate-50"
                }${index === 0 ? " rounded-l-md" : ""} ${
                  index === Object.values(EnumStatus).length - 1
                    ? " rounded-r-md"
                    : ""
                } `}
              >
                {statusLabels[status]}
              </li>
            ))}
          </ul> */}
        </div>

        <div>
          <p className="w-24 text-lg ">완료일</p>
          <p>YYYY/MM/DD (AM)00:00</p>
          {/*  <p>{items ? formatRelativeDate(items.created_at.toString()) : ""}</p> */}
        </div>
        <div>
          <p className="w-24 text-lg ">메모</p>
          <textarea
            className="flex-1 p-3 border rounded-lg border-slate-400 min-h-24"
            placeholder="간단한 메모 작성 가능"
          ></textarea>
        </div>
      </div>
      <div className=" p-3 flex gap-2.5 rounded-b-lg">
        <button className="flex-1 h-12 border rounded-lg bg-slate-50 border-slate-400 text-slate-400">
          저장
        </button>
        <button className="flex-1 h-12 font-bold bg-blue-400 rounded-lg text-blue-50">
          저장/문자보내기
        </button>
      </div>
      {/* <SendCheck /> */}
    </div>
  );
}
