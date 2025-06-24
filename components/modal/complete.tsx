import Button from "@/components/form-button";
import { Frame } from "@/components/modal/frame";
import Image from "next/image";

type confirmProps = {
  title?: string;
  txt: string;
  onClose: () => void;
};

export default function Complete({ title = "", txt, onClose }: confirmProps) {
  return (
    <Frame
      header={
        <>
          <div className="size-16">
            <Image
              src={`/images/checked.png`}
              width={56}
              height={56}
              alt="icon"
            />
          </div>
          <h3 className="text-3xl font-bold text-blue-400">
            {title ? title : `완료되었습니다`}
          </h3>
        </>
      }
      body={<p className="text-center break-keep">{txt}</p>}
      footer={
        <Button className={"h-12 flex-1"} onClick={onClose}>
          완료
        </Button>
      }
    />
  );
}
