"use client";

import { useRef, useEffect } from "react";

interface TextareaProps extends React.ComponentPropsWithRef<"textarea"> {
  autoResize?: boolean; // 높이 자동 조절 여부
}

export default function Textarea({
  autoResize = false,
  value,
  onChange,
  ...rest
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 자동 높이 조절 로직
  useEffect(() => {
    if (autoResize && textareaRef.current) {
      const el = textareaRef.current;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [value, autoResize]);

  return (
    <textarea
      {...rest}
      value={value}
      onChange={onChange}
      ref={textareaRef}
      className={`p-2 border rounded border-slate-400 w-full min-h-[100px]`}
      style={{
        overflowY: autoResize ? "hidden" : "auto",
        resize: "none",
      }}
    />
  );
}
