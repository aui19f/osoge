"use client";
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";

import { StatusOptions } from "@/types/StatusOptions";
import Image from "next/image";

import { useState } from "react";

export default function ItemDetails({ onClose }: { onClose: () => void }) {
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState("READY");

  const changeStatus = (id: string) => {
    setStatus(id);
  };

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center h-16 gap-2 border-b border-b-gray-300">
        <h4 className="flex-1 text-lg ">접수번호</h4>
        <div onClick={onClose}>닫기</div>
      </header>
      <div className="flex flex-col flex-1 gap-6 py-4">
        <div className="flex gap-2 text-xl">
          <p className="w-20 text-xl font-bold">핸드폰</p>
          <p className="flex-1">000-0000-0000</p>
        </div>

        <div className="flex items-center gap-2 text-xl">
          <p className="w-20 text-xl font-bold">가격</p>
          <Input
            type="number"
            name="price"
            value={price}
            className="flex-1"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        <div className="flex flex-col gap-2 text-xl">
          <p className="text-xl font-bold">상태</p>
          <ul className="flex flex-col gap-2">
            {StatusOptions.map((x) => (
              <li
                key={x.id}
                className={`flex items-center h-20 gap-4 p-4  border border-gray-200 rounded-md shadow-md cursor-pointer ${
                  status === x.id ? "bg-blue-400 text-white" : "bg-gray-100"
                }`}
                onClick={() => changeStatus(x.id)}
              >
                <Image
                  src={`/images/icons/status_${x.id.toLocaleLowerCase()}.png`}
                  alt={x.label}
                  width={32}
                  height={32}
                />
                <span>{x.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer className="flex items-center h-16 gap-2 ">
        <Button className="flex-1" variant="light">
          저장
        </Button>
        <Button className="flex-1" variant="primary">
          저장/전송
        </Button>
      </footer>
    </div>
  );
}
