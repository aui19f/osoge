import { StatusLabels } from "@/types/StatusOptions";
import dayjs from "dayjs";
import Image from "next/image";
import { EnumStatus } from "@prisma/client";
import Link from "next/link";
import { TypeRegisterItem } from "@/app/master/list/actions";
import { highlightText } from "@/components/common/highlightText";
import { OUTPUT_PHONE_REGEX } from "@/lib/utils/regex";
import { highlightPhone } from "@/components/common/highlightPhone";
import { formatPhone } from "@/lib/utils/format";

interface ListItemProps extends TypeRegisterItem {
  word?: string;
  type?: string;
}

export default function ListItem({
  serialCode,
  created_at,
  status,
  customerId,
  phone,
  word = "",
  type,
}: ListItemProps) {
  return (
    <li className="relative px-2 py-4 border-b border-b-gray-200">
      <Link href={`list/${serialCode}`} scroll={false}>
        <div className="absolute flex items-center gap-1 rounded-md top-2 right-2">
          {customerId && (
            <Image
              src="/images/icons/list_is_sms_false.png"
              alt="전송유무"
              width={18}
              height={18}
            />
          )}

          <div className="p-1 text-sm bg-gray-200 rounded-md dark:bg-blue-800">
            <p className="dark:text-gray-100">
              {StatusLabels[status as EnumStatus]}
            </p>
          </div>
        </div>
        <div className="flex gap-4 ">
          <span>접수번호</span>
          <span className="text-lg font-bold">
            {type === "receipt" && word
              ? highlightText(serialCode, word)
              : serialCode}
          </span>
        </div>

        {type === "phone" && (
          <div className="flex gap-4 ">
            <span>핸드폰</span>
            <span className="text-lg font-bold">
              {word
                ? highlightPhone(String(phone), word)
                : formatPhone(String(phone))}
            </span>
          </div>
        )}

        <div className="flex gap-4 ">
          <span>접수날짜</span>
          <span>{dayjs(created_at).format("YYYY-MM-DD HH:mm")}</span>
        </div>
      </Link>
    </li>
  );
}
