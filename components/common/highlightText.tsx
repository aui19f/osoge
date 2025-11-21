export function highlightText(text: string, highlight?: string) {
  if (!highlight || !text.includes(highlight)) {
    return <span>{text}</span>;
  }

  const parts = text.split(highlight);

  return (
    <>
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 && (
            <span className="text-red-400">{highlight}</span>
          )}
        </span>
      ))}
    </>
  );
}
