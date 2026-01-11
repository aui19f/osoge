import { formatStatusKo, STATUS_COLORS } from "@/utils/constants/status";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { EnumStatus } from "@prisma/client";

export interface LineItemProps {
  id: string;
  created_at: Date;
  status: EnumStatus;
  page?: string;
  phone?: string;
  name: string | null;
}

export default function LineItem({
  id,
  created_at,
  status,
  page,
  phone,
  name = "",
}: LineItemProps) {
  return (
    <li className="relative p-2 border-b border-b-gray-200 50">
      <Link href={`${page}/${id}`} scroll={false} className="flex gap-4">
        <div>
          <span
            className={`px-0.5 py-1 text-sm rounded-sm ${STATUS_COLORS[status]} `}
          >
            {formatStatusKo(status)}
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
        {page && (
          <div className="flex items-center gap-2">
            <div>
              <Image
                src={`/images/icons/line_item_${page}.png`}
                width={24}
                height={24}
                alt="type"
              />
            </div>
            <p>0</p>
          </div>
        )}
      </Link>
    </li>
  );
}
