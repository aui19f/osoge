"use client";
import fetchReceiveList from "@/app/master/list/actions";
import Button from "@/components/form-button";
import Select from "@/components/form-select";
import ItemList from "@/components/item-list";
import ItemListSkeleton from "@/components/ItemListSkeleton";
import Tabs from "@/components/tabs";
import { statusSelectOptions } from "@/lib/constants/status";
import { EnumStatus } from "@prisma/client";
import Image from "next/image";
import { useActionState, useState } from "react";

export default function List() {
  const [isLoading, setIsLoading] = useState(false);
  const [state, actions] = useActionState(fetchReceiveList, null);
  const [status, setStatus] = useState<EnumStatus[]>([EnumStatus.READY]);
  const [option, setOption] = useState("2025-06");
  const options = [
    { id: "2025-06", label: "2025년 6월" },
    { id: "2025-07", label: "2025년 7월" },
  ];
  const onChange = (value: string) => {
    setOption(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // FormData 객체를 생성하여 현재 상태 값들을 추가
    const formData = new FormData();
    if (status.length === 0) {
      return false;
    }
    formData.append("date", option);
    formData.append("status", JSON.stringify(status));

    // // useActionState에서 반환된 formAction 함수를 직접 호출
    // 이렇게 하면 폼의 input value에 직접 의존하지 않고 현재 React state를 기반으로 액션을 실행
    try {
      await setIsLoading(true);
      await actions(formData);
    } finally {
      await setIsLoading(false);
    }
  };
  const changeStatus = (id: string) => {
    setStatus((prev) =>
      prev.includes(id as EnumStatus)
        ? prev.filter((x) => x !== (id as EnumStatus))
        : [...prev, id as EnumStatus]
    );
  };

  return (
    <>
      <div>
        <form
          action={actions}
          onSubmit={handleSubmit}
          className="flex items-center h-20 gap-1 p-3"
        >
          <Select
            name="date"
            value={option}
            options={options}
            onChange={(val) => onChange(val)}
          />

          <Tabs
            name="status"
            options={statusSelectOptions}
            selected={status}
            onClick={(id) => changeStatus(id)}
            isrequired={status.length === 0}
          />

          <div className="flex items-center justify-center border rounded-md size-12 border-slate-200">
            <Image src="/images/sort.png" alt="sort" width={20} height={20} />
          </div>
          <Button type="submit" className="h-12" disabled={isLoading}>
            조회
          </Button>
        </form>
        {status.length === 0 && (
          <p className="px-3 mb-3 text-sm text-right text-red-400">
            접수, 완료, 취소 중 하나를 선택해주세요.
          </p>
        )}
      </div>

      <ul className="flex flex-col gap-2 px-2 pt-3 border-t border-t-slate-200">
        {isLoading ? (
          <ItemListSkeleton length={5} />
        ) : state?.data?.length === 0 ? (
          <>
            <p className="my-2 text-center text-red-400">데이터가 없습니다.</p>
          </>
        ) : (
          state?.data?.map((item) => <ItemList key={item.id} {...item} />)
        )}
      </ul>
    </>
  );
}
