// .storybook/preview.tsx
import React from "react";
import * as NextImage from "next/image";
import type { ImageProps } from "next/image";

Object.defineProperty(NextImage, "default", {
  configurable: true,

  value: (props: ImageProps) => {
    const { src, alt, ...rest } = props;
    const imgSrc = typeof src === "string" ? src : "";
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={imgSrc} alt={alt ?? ""} {...rest} />
    );
  },
});
