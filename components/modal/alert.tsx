import Button from "@/components/forms/Button";
import { Frame } from "@/components/modal/frame";
import Image from "next/image";

type confirmProps = {
  title?: string;
  txt: string;
  btn: string;
  icon?: string;
  onClose?: () => void;
};

export default function Alert({
  icon,
  title,
  txt,
  btn,
  onClose,
}: confirmProps) {
  return (
    <Frame
      header={
        <>
          <div className="size-16">
            <Image
              src={`/images/${icon}.png`}
              width={56}
              height={56}
              alt="icon"
            />
          </div>
          {title && (
            <h3 className="text-3xl font-bold text-blue-400">{title}</h3>
          )}
        </>
      }
      body={<p className="text-center break-keep">{txt}</p>}
      footer={
        <Button className={"h-12 flex-1"} onClick={onClose}>
          {btn}
        </Button>
      }
    />
  );
}
