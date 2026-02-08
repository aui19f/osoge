import Image from "next/image";
import Link from "next/link";

export default function Mgmt() {
  return <li className="bg-white shadow-md rounded-md bg-[linear-gradient(127.62deg, #FFFFFF_21.17%, #EFF3F8_100%)]  p-4 ">
    <Link href={`/admin/management/${123}`} className="flex gap-6">
      <div className="flex flex-col items-center gap-1">
        <div className="p-4 rounded-lg size-14 bg-slate-700">
          <Image src="/images/icons/management_type_sewing.png" width={48} height={48} alt="type" />
        </div>
        <span className="p-1 text-sm font-bold text-white bg-blue-400 rounded-sm">사용중</span>
      </div>
      <div className="flex flex-col flex-1">
        <div>
          <h3 className="text-xl font-bold">상점이름</h3>
          <span className="text-sm">000-00-00000</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="w-14">연락처</p>
            <p>000-0000-0000</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="w-14">플랜</p>
            <p>프리미엄</p>
          </div>
        </div>


      </div>
    </Link>
  </li>
}