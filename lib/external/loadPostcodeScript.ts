import { DaumPostcodeData } from "@/types/doum-postcode";

export const loadDaumPostcodeScript = () =>
  new Promise<void>((resolve) => {
    if (window.daum?.Postcode) return resolve();

    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => resolve();
    document.head.appendChild(script);
  });

export const getExtraRoadAddress = (data: DaumPostcodeData) => {
  const extras: string[] = [];

  if (data.bname && /[동|로|가]$/g.test(data.bname)) {
    extras.push(data.bname);
  }

  if (data.buildingName && data.apartment === "Y") {
    extras.push(data.buildingName);
  }

  return extras.length ? ` (${extras.join(", ")})` : "";
};
