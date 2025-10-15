"use client";
// ype error: Type '{ params: { id: string; }; }' does not satisfy the constraint 'PageProps'.
import {
  fetchReceiveById,
  InitialReceiveDetail,
  updateReceiveStatus,
} from "@/app/(auth)/master/search/[id]/actions";
import Button from "@/components/forms/Button";
import Loading from "@/components/loading";
import Tabs from "@/components/tabs";
import { EnumNextStatus, statusSelectOptions } from "@/lib/constants/status";

import dayjs from "dayjs";
// import { usePathname } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Details({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  // const pathname = usePathname();
  // console.log(">>>>>", pathname);

  const [isLoading, setIsLoading] = useState(true);

  const [item, setItem] = useState<InitialReceiveDetail>();
  const [status, setStatus] = useState("");

  const changeStatus = (id: string) => {
    setStatus(id);
  };

  const save = async () => {
    await updateReceiveStatus(id, status as EnumNextStatus);
    alert("완료되었습니다.");
  };

  useEffect(() => {
    const getItem = async () => {
      const result = await fetchReceiveById(id);
      if (!result) {
        return false;
      }
      setItem(result);
      setStatus(result.status);
      setIsLoading(false);
    };
    getItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col ">
      {isLoading && <Loading />}
      <div className="flex flex-col gap-2.5 p-3 [&>div]:flex [&>div]:p-2 [&>div>p]:text-lg flex-1">
        <div>
          <p className="w-24 text-lg ">접수일</p>
          <p>{dayjs(item?.created_at).format("YYYY/MM/DD")}</p>
        </div>

        {item?.phone && (
          <div>
            <p className="w-24 text-lg ">연락처</p>
            <p>{item?.phone}</p>
          </div>
        )}

        <div>
          <p className="w-24 text-lg ">상태 </p>
          <Tabs
            name="status"
            selected={[status]}
            options={statusSelectOptions}
            className="flex-1"
            onClick={(id) => changeStatus(id)}
          />
        </div>

        {item?.status === EnumNextStatus.COMPLETED && (
          <div>
            <p className="w-24 text-lg ">완료일</p>
            <p>{dayjs(item?.updated_at).format("YYYY/MM/DD")}</p>
          </div>
        )}
        {item?.status === EnumNextStatus.CANCEL && (
          <div>
            <p className="w-24 text-lg ">취소일</p>
            <p>{dayjs(item?.updated_at).format("YYYY/MM/DD")}</p>
          </div>
        )}

        {/* <div>
          <p className="w-24 text-lg ">메모</p>
          <textarea
            className="flex-1 p-3 border rounded-lg border-slate-400 min-h-24"
            placeholder="간단한 메모 작성 가능"
          ></textarea>
        </div> */}

        <div className=" p-3 flex gap-2.5 rounded-b-lg">
          <Button
            variant="secondary-line"
            className={"h-12 flex-1"}
            onClick={save}
          >
            저장
          </Button>
          <Button className={"h-12 flex-1"}>저장/문자보내기</Button>
        </div>
      </div>
    </div>
  );
}
