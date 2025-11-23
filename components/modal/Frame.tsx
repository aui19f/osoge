import Image from "next/image";

type modalProps = {
  title?: string;
  onClose?: () => void;
  children: React.ReactNode;
};

export function ModalFrame({
  title = "",
  children,

  onClose,
}: modalProps) {
  return (
    <div className="fixed inset-0 top-0 bottom-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-4/5 overflow-hidden bg-white rounded-lg shadow-lg md:w-96">
        {title && (
          <div className="py-4 px-2 flex items-center  gap-2.5 rounded-t-lg border-b border-b-gray-300">
            <h4 className="flex-1 text-xl font-bold ">{title}</h4>

            <div className="relative m-2 size-6 " onClick={onClose}>
              <Image src="/images/icons/close.png" fill={true} alt="닫기" />
            </div>
          </div>
        )}

        {children}

        {/* {footer && (
          <div className=" p-4 flex gap-2.5 rounded-b-lg">{footer}</div>
        )} */}
      </div>
    </div>
  );
}
