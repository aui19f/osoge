"use client";
import fetchReceiveList from "@/app/(auth)/master/list/actions";
import { getList } from "@/app/actions/getList";
import Button from "@/components/form-button";
import DateSelect from "@/components/form-select-date";
import ItemList from "@/components/item-list";
import ItemListSkeleton from "@/components/ItemListSkeleton";
import Tabs from "@/components/tabs";
import { statusSelectOptions } from "@/lib/constants/status";

import { useListStore } from "@/store/useListStore";
import { useUserStore } from "@/store/useUserStore";
import { EnumStatus } from "@prisma/client";
import dayjs from "dayjs";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";

export default function List() {
  const user = useUserStore((state) => state.user);
  const startDate = dayjs(user?.created_at).format("YYYY-MM");
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM"));
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<EnumStatus[]>([EnumStatus.READY]);

  const {
    items,
    page,
    hasMore,
    addItems,
    setPage,
    setHasMore,
    scrollY,
    setScrollY,
  } = useListStore();

  const onChange = (value: string) => {
    setSelectedDate(value);
  };

  const changeStatus = (id: string) => {
    setStatus((prev) =>
      prev.includes(id as EnumStatus)
        ? prev.filter((x) => x !== (id as EnumStatus))
        : [...prev, id as EnumStatus]
    );
  };

  const fetchData = async () => {
    console.log(status);

    // setIsLoading(true);
    // const where  = {
    //   created_at: {
    //     gte: startDate, // Greater Than or Equal (시작일 포함)
    //     lte: endDate, // Less Than or Equal (마지막일 포함)
    //   },
    //   status: { in: enumStatuses },
    // };
    // const data = await getList({
    //   enumStatuses: status,
    //   date: selectedDate,
    //   skipNum: page,
    //   takeNum: 10,
    // });
    // addItems(data);
    // setIsLoading(false);
  };

  useEffect(() => {
    if (items.length === 0) fetchData();
    // 뒤로가기 시 스크롤 복원
    window.scrollTo(0, scrollY);
    return () => {
      setScrollY(window.scrollY);
    };
  }, []);
  return (
    <>
      <section>
        <div className="flex items-center h-20 gap-1 p-3">
          <DateSelect
            name="date"
            type="month"
            start={startDate}
            value={selectedDate}
            onChange={(value: string) => onChange(value)}
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
          <Button
            className="h-12"
            disabled={isLoading}
            onClick={() => fetchData()}
          >
            조회
          </Button>
        </div>
        {status.length === 0 && (
          <p className="px-3 mb-3 text-sm text-right text-red-400">
            접수, 완료, 취소 중 하나를 선택해주세요.
          </p>
        )}
      </section>

      <ul className="flex flex-col gap-2 px-2 pt-3 border-t border-t-slate-200">
        {isLoading ? (
          <ItemListSkeleton length={5} />
        ) : items?.length === 0 ? (
          <>
            <p className="my-2 text-center text-red-400">데이터가 없습니다.</p>
          </>
        ) : (
          items?.map((item) => <ItemList key={item.id} {...item} />)
        )}
      </ul>
    </>
  );
}
