import { STATUS_COLORS, STATUS_LABELS } from "@/utils/constants/status";
import dayjs from "dayjs";
import Image from "next/image";
import { EnumStatus } from "@prisma/client";

export interface LineItemProps {
  created_at: Date;
  status: EnumStatus;
  page?: string;
  phone?: string;
  name: string | null;
  count?: number;
}

export default function LineItem({
  created_at,
  status,
  page,
  phone,
  name = "",
  count = 0,
}: LineItemProps) {
  return (
    <li className="relative flex gap-4 p-2 border-b border-b-gray-200 ">
      <div>
        <span
          className={`px-0.5 py-1 text-sm rounded-sm ${STATUS_COLORS[status]} `}
        >
          {STATUS_LABELS[status]}
        </span>
      </div>

      <div className="flex-1 ">
        <div className="flex">
          <p className="w-16 font-bold">
            {page === "apply" ? "신청인" : "접수번호"}
          </p>
          <p className="flex-1">{name}</p>
        </div>
        {phone && (
          <div className="flex">
            <p className="w-16 font-bold">핸드폰</p>
            <p className="flex-1">010-****-{phone.slice(-4)}</p>
          </div>
        )}

        <div className="flex">
          <p className="w-16 font-bold">접수일</p>
          <p className="flex-1">
            {dayjs(created_at).format("YYYY/MM/DD hh:mm")}
          </p>
        </div>
      </div>
      {phone && (
        <div className="flex items-center gap-2">
          <div>
            <Image
              src={`/images/icons/line_item_${page}.png`}
              width={24}
              height={24}
              alt="type"
            />
          </div>
          <p>{count || 0}</p>
        </div>
      )}
    </li>
  );
}
