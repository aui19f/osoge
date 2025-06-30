import { EnumNextStatus, statusLabels } from "@/lib/constants/status";
import { EnumStatus } from "@prisma/client";
import dayjs from "dayjs";
import Link from "next/link";

// type ItemProps = NonNullable<InitialReceive["data"]>[number];
export interface ItemProps {
  id: string;
  serialCode: string;
  created_at?: Date;
  updated_at?: Date;
  phone?: string;
  status?: EnumStatus;
  usersId?: string;
}
export default function ItemList({
  id,
  serialCode,
  created_at,
  // updated_at,
  phone,
  status,
}: ItemProps) {
  return (
    <Link href={`/master/search/${id}`}>
      <li
        key={id}
        className="p-3 bg-white rounded-md shadow-sm [&>p]:flex [&>p>span:first-child]:flex-1 [&>p>span:first-child]:font-bold [&>p>span:last-child]:flex-3 relative"
      >
        <div
          className={`
      ${status === EnumNextStatus.READY && "bg-red-400"} 
      ${status === EnumNextStatus.COMPLETED && "bg-emerald-600"} 
     ${status === EnumNextStatus.CANCEL && "bg-gray-400"}  
     absolute flex items-center gap-1 px-2 rounded-md top-2 right-2`}
        >
          <p className="text-sm font-bold text-white">
            {" "}
            {statusLabels[status as EnumNextStatus]}
          </p>
        </div>
        <h3 className="text-2xl font-bold">{serialCode}</h3>

        {phone && (
          <p>
            <span>연락처</span>
            <span>{phone.replace(/.(?=.{4})/g, "*")}</span>
          </p>
        )}
        <p>
          <span>접수일</span>
          <span>{dayjs(created_at).format("YYYY/MM/DD")}</span>
        </p>
      </li>
    </Link>
  );
}
