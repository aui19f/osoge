import Button from "@/components/forms/Button";
import { Frame } from "@/components/modal/frame";
import { IOption } from "@/types/options";
import Image from "next/image";

type confirmProps = {
  title: string;
  icon: string;
  sutmsg?: string;
  textArr?: IOption[];
  onClose: () => void;
  onClick: () => void;
};

export default function Confirm({
  title,
  icon,
  sutmsg,
  textArr = [],
  onClose,
  onClick,
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
          <h3 className="text-3xl font-bold text-blue-400">{title}</h3>
          <p className="text-blue-400">{sutmsg}</p>
        </>
      }
      body={
        <>
          {" "}
          {textArr.map((item, index) => (
            <div className="flex gap-1.5" key={index}>
              <div className="bg-gray-200 rounded-full size-6"></div>
              <p>{item.label}</p>
              <p>{item.txt}</p>
            </div>
          ))}
        </>
      }
      footer={
        <>
          <Button
            variant="secondary-line"
            className={"h-12 flex-1"}
            onClick={onClose}
          >
            취소
          </Button>
          <Button className={"h-12 flex-1"} onClick={onClick}>
            접수
          </Button>
        </>
      }
    />
  );
}
