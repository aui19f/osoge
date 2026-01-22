import Image from "next/image";

type Props = {
  onNumberClick: (num: string) => void;
  onDelete: () => void;
  onSubmit: () => void;
};

export default function Keypad({ onNumberClick, onDelete, onSubmit }: Props) {
  const numbers = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["submit", "0", "delete"],
  ];

  return (
    <div className="grid grid-rows-4 gap-2 ">
      {numbers.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-3 gap-3">
          {row.map((item) => {
            const isDelete = item === "delete";
            const isSubmit = item === "submit";
            return (
              <button
                key={item}
                type="button"
                className={`text-2xl font-bold py-5 rounded-2xl transition-all duration-200
                /* 글래스모피즘 핵심: 반투명 배경 + 블러 효과 + 가느다란 테두리 */
                backdrop-blur-md border border-white/20 shadow-lg
                
                ${
                  isSubmit
                    ? "bg-blue-500/80 text-white shadow-blue-500/20 active:scale-95"
                    : isDelete
                    ? "bg-red-500/20 text-red-500 border-red-500/30 active:scale-95"
                    : "bg-white/40 text-gray-800 active:bg-white/60 active:scale-95"
                }`}
                onClick={() => {
                  if (isDelete) onDelete();
                  else if (isSubmit) onSubmit();
                  else onNumberClick(item);
                }}
              >
                {/* 내부 아이콘 및 텍스트 로직 동일 */}
                {isDelete ? (
                  <Image
                    src="/images/icons/backspace.png"
                    width={32}
                    height={32}
                    alt="지우기"
                    className="m-auto opacity-80"
                  />
                ) : isSubmit ? (
                  "초기화"
                ) : (
                  item
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
