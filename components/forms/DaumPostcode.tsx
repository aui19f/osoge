"use client";

import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import {
  getExtraRoadAddress,
  loadDaumPostcodeScript,
} from "@/lib/external/loadPostcodeScript";
import { ReturnAddress } from "@/types/doum-postcode";
import React, { useState, useEffect, useCallback } from "react";

type Props = {
  onChange?: (addr: ReturnAddress) => void;
};

export default function DaumPostcode({ onChange }: Props) {
  const [address, setAddress] = useState<ReturnAddress>({
    zonecode: "",
    roadAddress: "",
    detailAddress: "",
  });

  useEffect(() => {
    loadDaumPostcodeScript();
  }, []);

  const changeDetails = (value: string) => {
    setAddress((prev) => ({
      ...prev,
      detailAddress: value,
    }));
    onChange?.({
      ...address,
      detailAddress: value,
    });
  };

  const handleOpenPostcode = useCallback(async () => {
    await loadDaumPostcodeScript();

    if (!window.daum?.Postcode) return;

    // 현재 상세 주소를 닫힘 함수 내에서 사용해야 하므로, address를 디펜던시로 추가합니다.
    const currentDetailAddress = address.detailAddress;

    new window.daum.Postcode({
      oncomplete: (data) => {
        const extra = getExtraRoadAddress(data);
        const newRoadAddress = `${data.roadAddress}${extra}`;
        const newAddress = {
          zonecode: data.zonecode,
          roadAddress: newRoadAddress,
          detailAddress: currentDetailAddress,
        };

        // 1) 내부 상태 업데이트
        setAddress((prev) => ({
          ...prev,
          zonecode: data.zonecode,
          roadAddress: newRoadAddress,
        }));

        // 2) 부모 컴포넌트에 업데이트된 주소 전달
        onChange?.(newAddress);
      },
    }).open();
  }, [onChange, address.detailAddress]);
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex gap-2 [&>input]:flex-1">
        <Input
          name="zonecode"
          value={address.zonecode}
          readOnly
          placeholder="우편번호"
          onChange={() => {}}
        />
        <Button type="button" onClick={handleOpenPostcode}>
          주소검색
        </Button>
      </div>

      <Input
        name="roadAddress"
        value={address.roadAddress}
        readOnly
        placeholder="도로명주소"
        onChange={() => {}}
      />

      <Input
        name="detailAddress"
        value={address.detailAddress}
        placeholder="상세주소"
        disabled={Boolean(!address.zonecode)}
        onChange={(e) => changeDetails(e.target.value)}
      />
    </div>
  );
}
