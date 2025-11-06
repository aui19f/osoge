"use client";

import { FormTextarea } from "@/types/forms";
import { useRef, useEffect } from "react";

// 높이가 자동으로 늘어가는 형식 (height) 고정(scroll)
interface TextareaCusteom {
  type?: "scroll" | "height";
}

export default function Textarea({
  name,
  value,
  type = "scroll",
  onChange,
  className = "",
  ...rest
}: FormTextarea & TextareaCusteom) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // height 타입일 때 자동 높이 조절
  useEffect(() => {
    if (type === "height" && textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용에 맞춰 조절
    }
  }, [value, type]);

  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      {...rest}
      ref={textareaRef}
      className={`
        
        ${className || ""}
      `}
      style={{
        overflowY: type === "scroll" ? "auto" : "hidden",
      }}
    />
  );
}
