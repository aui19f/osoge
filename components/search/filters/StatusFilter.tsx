import Tabs from "@/components/forms/Tabs";
import { SearchBarInput } from "@/schemas/search";
import { STATUS_OPTIONS } from "@/utils/constants/status";
import { EnumStatus } from "@prisma/client";
import { useFormContext } from "react-hook-form";

export default function StatusFilter(){
// 1. useFormContext에 제네릭을 명시하여 status가 EnumStatus[]임을 알립니다.
const { watch, setValue } = useFormContext<SearchBarInput>();
  
// 2. watch를 통해 현재 선택된 EnumStatus 배열을 가져옵니다.
const currentStatus: EnumStatus[] = watch("status") || [];

const onChangeStatus = (clickedValue: string) => {

  // 3. 들어온 string 값을 EnumStatus 타입으로 확정합니다.
  const clickedStatus = clickedValue as EnumStatus;

  // 4. 토글(Toggle) 로직
  const nextStatus = currentStatus.includes(clickedStatus)
    ? currentStatus.filter((s) => s !== clickedStatus)
    : [...currentStatus, clickedStatus];

  // 5. 업데이트
  setValue("status", nextStatus, { shouldValidate: true });
};
  return <div className="p-4 space-y-2 bg-white rounded-md">
  <p className="text-lg font-bold">상태</p>
  <Tabs
    options={STATUS_OPTIONS}
    selected={currentStatus}
    // onChange={(val) => onChangeStatus(val as EnumStatus)}
    onChange={onChangeStatus}
  />
</div>

}