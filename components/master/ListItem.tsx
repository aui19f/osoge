import Image from "next/image";

export default function ListItem() {
  return (
    <li className="relative p-2 border border-gray-400 rounded-lg">
      <div className="absolute flex items-center gap-1 rounded-md top-2 right-2">
        <Image
          src="/images/icons/list_is_sms_false.png"
          alt="전송유무"
          width={18}
          height={18}
        />

        <div className="p-1 text-sm bg-gray-200 rounded-md">상태</div>
      </div>
      <div className="flex gap-4 ">
        <span>접수번호</span>
        <span className="text-lg font-bold">25101901</span>
      </div>
      <div className="flex gap-4 ">
        <span>접수날짜</span>
        <span>YYYY/MM/DD HH:MM</span>
      </div>
    </li>
  );
}
