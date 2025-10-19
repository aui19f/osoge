import Image from "next/image";
export interface SortProps {
  value: "desc" | "asc"; // 💡 타입이 string이 아닌, 두 문자열 리터럴로 제한됨
  isLabel: boolean;
  onClick: () => void;
}
//const [sort, setSort] = useState<"desc" | "asc">("desc");
export default function Sort({ value, isLabel, onClick }: SortProps) {
  return (
    <div
      className="flex items-center justify-center w-12 h-12 gap-1"
      onClick={onClick}
    >
      <Image
        src={`/images/icons/sort_${value}.png`}
        alt={value === "desc" ? "오름차순" : "내림차순"}
        width={18}
        height={18}
      />
      {isLabel && <p>{value === "desc" ? "오름차순" : "내림차순"}</p>}
    </div>
  );
}
