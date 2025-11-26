"use client";
import { TypeRegisterItem } from "@/app/master/list/actions";
import {
  searchRegisterById,
  updateRegisterItem,
} from "@/app/master/search/actions";
import Button from "@/components/forms/Button";

import NumberInput from "@/components/forms/InputNumber";
import Tabs from "@/components/forms/Tabs";
import Loading from "@/components/layout/Loading";

import Confirm from "@/components/modal/Confirm";
import { formatNumber, formatPhone } from "@/lib/utils/format";
import { FormOption } from "@/types/forms";

import { formatStatusKo, StatusOptions } from "@/types/StatusOptions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import { useParams } from "next/navigation";

import { useState } from "react";

export default function ItemDetails({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  const params = useParams();
  const id = params.id as string;

  const [price, setPrice] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [confirmType, setConfirmType] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const options = [
    { id: "prepaid", label: "선불" },
    { id: "postpaid", label: "후불" },
  ];

  const [status, setStatus] = useState("READY");

  // 캐시에서 아이템 찾기 함수
  const findInCache = (): TypeRegisterItem | undefined => {
    const queries = queryClient.getQueriesData<TypeRegisterItem[]>({
      queryKey: ["recipes", id],
    });
    for (const [, data] of queries) {
      const found = data?.find((item) => item.id === id);
      if (found) return found;
    }
    return undefined;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["register", id],
    queryFn: async () => {
      // 캐시 우선 조회
      const cached = findInCache();
      //없으면 호출
      if (cached) {
        console.log("cached", cached);
        return cached;
      }
      return await searchRegisterById(id);
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const changeStatus = (id: string) => {
    setStatus(id);
  };

  const changesMethod = (e: FormOption) => {
    const { id } = e;
    if (selected.includes(id)) {
      setSelected([]);
    } else {
      setSelected([id]);
    }
  };

  const save = async () => {
    setConfirmType("save");
    setConfirmModal(true);
    console.log("저장만");
    console.log(data);
    console.log(price, selected, status);

    await updateRegisterItem({
      id,
      type: "save",
      price,
      paymentMethod: selected[0],
      status,
    });
  };
  const saveToSend = () => {
    setConfirmType("saveToSend");
    console.log(data);
    console.log(price, selected, status);
    console.log("저장후 전송");
  };

  const resetModal = () => {
    setConfirmType("");
    setConfirmModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <Loading />
      </div>
    );
  }
  if (error || !data) {
  }

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center h-16 gap-2 border-b border-b-gray-300">
        <h4 className="flex-1 text-2xl font-bold ">{data?.serialCode}</h4>
        <div onClick={onClose}>닫기</div>
      </header>
      <div className="flex flex-col flex-1 gap-2 py-4">
        {data?.phone && (
          <div className="flex gap-2 ">
            <p className="w-20 font-bold">핸드폰</p>
            <p className="flex-1">{formatPhone(String(data?.phone))}</p>
          </div>
        )}

        <div className="flex items-center gap-2 ">
          <p className="w-20 font-bold">접수일</p>
          <p className="flex-1">
            {dayjs(data?.created_at).format("YYYY-MM-DD HH:mm")}
          </p>
        </div>

        {data?.completionAt && (
          <div className="flex items-center gap-2 ">
            <p className="w-20 font-bold">완료일</p>
            <p className="flex-1">
              {dayjs(data?.completionAt).format("YYYY-MM-DD HH:mm")}{" "}
              <span className="font-bold">
                (+
                {dayjs(data?.completionAt).diff(dayjs(data?.created_at), "day")}
                일)
              </span>
            </p>
          </div>
        )}

        <div className="flex items-center gap-2 ">
          <p className="w-20 font-bold">가격</p>
          <NumberInput
            name="price"
            value={price}
            onChange={setPrice}
            placeholder="금액 입력"
            className="flex-1 rounded-sm"
            maxLength={10}
          />
        </div>
        <div className="flex items-center gap-2 ">
          <p className="w-20 font-bold">방법</p>
          <Tabs
            selected={selected}
            options={options}
            className="flex-1 rounded-sm"
            onClick={(e) => changesMethod(e)}
          />
        </div>

        <div className="flex flex-col gap-2 ">
          <p className="font-bold ">상태</p>
          <ul className="flex flex-col gap-2">
            {StatusOptions.map((x) => (
              <li
                key={x.id}
                className={`flex items-center  gap-4 p-4  border border-gray-200 rounded-md shadow-md cursor-pointer ${
                  status === x.id ? "bg-blue-400 text-white" : "bg-gray-100"
                }`}
                onClick={() => changeStatus(x.id)}
              >
                <Image
                  src={`/images/icons/status_${x.id.toLocaleLowerCase()}.png`}
                  alt={x.label}
                  width={28}
                  height={28}
                />
                <span>{x.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer className="flex items-center h-16 gap-2 ">
        <Button className="flex-1" variant="light" onClick={save}>
          저장
        </Button>
        {data?.phone && (
          <Button className="flex-1" variant="primary" onClick={saveToSend}>
            저장/전송
          </Button>
        )}
      </footer>

      {confirmModal && (
        <Confirm cancel={resetModal} ok={() => {}}>
          <div className="flex items-center justify-center gap-2 mt-4">
            {confirmType === "save" ? (
              <Image
                src="/images/icons/alert_save.png"
                width={64}
                height={64}
                alt={``}
              />
            ) : (
              <Image
                src="/images/icons/alert_save_to_send.png"
                width={64}
                height={64}
                alt={``}
              />
            )}
          </div>
          <ul className="my-4">
            {price && Number(price) > 0 && (
              <li>
                <p className="text-xl ">
                  가격: <span className="font-bold">{formatNumber(price)}</span>
                </p>
              </li>
            )}
            {selected.length > 0 && (
              <li>
                <p className="text-xl ">
                  방법:{" "}
                  <span className="font-bold">
                    {options.find((x) => x.id === selected[0])?.label}
                  </span>
                </p>
              </li>
            )}
            <li>
              <p className="text-xl ">
                상태:{" "}
                <span className="font-bold">{formatStatusKo(status)}</span>
              </p>
            </li>
            {data?.phone && (
              <li>
                <p className="text-xl ">
                  전송횟수:
                  <span className="font-bold">00</span>
                </p>
              </li>
            )}
          </ul>

          <p>
            {confirmType === "save"
              ? "저장하시겠습니까?"
              : "저장후 전송하시겠습니까?"}
          </p>
        </Confirm>
      )}
    </div>
  );
}
