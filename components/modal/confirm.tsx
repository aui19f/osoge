import Button from "@/components/form-button";
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
    <div className="fixed left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center ">
      <div className="shadow-2xl w-80">
        <div className="flex flex-col items-center py-10 bg-slate-50 gap-2.5 rounded-t-lg p-6">
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
        </div>
        <div className="bg-slate-100 px-10 py-6 flex flex-col gap-2.5">
          {textArr.map((item, index) => (
            <div className="flex gap-1.5" key={index}>
              <div className="bg-gray-200 rounded-full size-6"></div>
              <p>{item.label}</p>
              <p>{item.txt}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-100 p-4 flex gap-2.5 rounded-b-lg">
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
        </div>
      </div>
    </div>
  );
}
