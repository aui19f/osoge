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
    <div className="grid grid-rows-4 gap-2">
      {numbers.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-3 gap-3">
          {row.map((item) => {
            const isDelete = item === "delete";
            const isSubmit = item === "submit";
            return (
              <button
                key={item}
                type="button"
                className={`text-2xl font-semibold py-5 rounded-xl shadow-sm transition
                  ${
                    isSubmit
                      ? "bg-blue-500 text-white active:bg-blue-600"
                      : isDelete
                      ? "bg-red-100 text-red-500 active:bg-red-200 "
                      : "bg-white active:bg-gray-100 dark:bg-gray-500"
                  }`}
                onClick={() => {
                  if (isDelete) onDelete();
                  else if (isSubmit) onSubmit();
                  else onNumberClick(item);
                }}
              >
                {isDelete ? "⌫" : isSubmit ? "초기화" : item}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
