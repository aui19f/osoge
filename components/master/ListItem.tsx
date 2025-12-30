import { StatusLabels } from "@/types/StatusOptions";
import dayjs from "dayjs";
import Image from "next/image";
import { EnumStatus } from "@prisma/client";
import Link from "next/link";
import { TypeRegisterItem } from "@/app/master/list/actions";
import { highlightText } from "@/components/common/highlightText";
import { highlightPhone } from "@/components/common/highlightPhone";
import { formatPhoneNumber } from "@/utils/formatter/phone";

interface ListItemProps extends TypeRegisterItem {
  word?: string;
  type?: string;
}

export default function ListItem({
  id,
  serialCode,
  created_at,
  status,
  sendCount,
  phone,
  word = "",
  type,
}: ListItemProps) {
  const statusClasses: Record<string, string> = {
    READY: "bg-red-400",
    COMPLETED: "bg-blue-400",
    CANCEL: "bg-slate-400",
  };

  return (
    <li className="relative p-2 border-b border-b-gray-200">
      <Link href={`list/${id}`} scroll={false} className="flex gap-4">
        <div>
          <span
            className={`px-0.5 py-1 text-sm rounded-sm text-slate-50 
            ${statusClasses[status]}`}
          >
            {StatusLabels[status as EnumStatus]}
          </span>
        </div>

        <div className="flex-1 ">
          <div className="flex">
            <p className="w-16 font-bold">접수번호</p>
            <p className="flex-1">
              {word ? highlightText(serialCode, word) : serialCode}
            </p>
          </div>
          {type === "phone" && (
            <div className="flex">
              <p className="w-16 font-bold">핸드폰</p>
              <p className="flex-1">
                {word
                  ? highlightPhone(String(phone), word)
                  : formatPhoneNumber(String(phone))}
              </p>
            </div>
          )}
          <div className="flex">
            <p className="w-16 font-bold">접수날짜</p>
            <p className="flex-1">
              {dayjs(created_at).format("YYYY-MM-DD HH:mm")}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <div>
            {phone && (
              <Image
                src={`/images/icons/list_is_sms_${
                  sendCount === 0 ? "false" : "true"
                }.png`}
                alt="전송유무"
                width={18}
                height={18}
              />
            )}
          </div>
          {sendCount! > 0 && <span className="text-sm">{sendCount}</span>}
        </div>
      </Link>
    </li>
  );
}
