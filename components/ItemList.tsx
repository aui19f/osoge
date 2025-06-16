import { InitialReceive } from "@/app/master/list/actions";
import { statusLabels } from "@/lib/constants/status";

type ItemProps = InitialReceive[number];
export default function ItemList({ id, status, created_at, phone }: ItemProps) {
  return (
    <li
      key={id}
      className="p-3 bg-white rounded-md shadow-sm [&>p]:flex [&>p>span:first-child]:flex-1 [&>p>span:first-child]:font-bold [&>p>span:last-child]:flex-3 relative"
    >
      <div
        className={`
    ${status === "READY" && "bg-red-400"} 
    ${status === "COMPLETED" && "bg-emerald-600"} 
    ${status === "CANCEL" && "bg-gray-400"} 
     absolute flex items-center gap-1 px-2 rounded-md top-2 right-2`}
      >
        <p className="text-sm font-bold text-white"> {statusLabels[status]}</p>
      </div>
      <p>
        <span>접수일</span>
        <span>{created_at.toLocaleDateString()}</span>
      </p>
      {phone ? (
        <p>
          <span>연락처</span>
          <span>{phone}</span>
        </p>
      ) : (
        <p>
          <span>접수번호</span>
          <span>-</span>
        </p>
      )}
    </li>
  );
}
