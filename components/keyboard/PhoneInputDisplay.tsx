type Props = {
  value: string;
};

export default function PhoneInputDisplay({ value }: Props) {
  // 01012345678 → 010-1234-5678 형태로 포맷
  const formatted = value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{3})(\d{0,4})(\d{0,4})$/, (_, a, b, c) =>
      [a, b, c].filter(Boolean).join("-")
    );

  return (
    <div className="text-center">
      <div className="font-mono text-3xl tracking-wide text-gray-800">
        {formatted || "___-____-____"}
      </div>
    </div>
  );
}
