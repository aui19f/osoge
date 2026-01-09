import dayjs from "dayjs";
import "dayjs/locale/ko";

import RegisterForm from "@/app/master/(without-menu)/register/RegisterForm";

export default async function RegisterPage() {
  dayjs.locale("ko");

  return (
    <div className="flex flex-col h-screen gap-4 p-4">
      <p className="text-xl font-bold">
        {dayjs().format("YYYY년 M월 D일 dddd")}
      </p>
      {/* <RegisterForm storeId={store?.id || ""} /> */}
      <RegisterForm storeId={"405ea1a3-a053-4f0f-a9a3-bbc065ab7cf3"} />
    </div>
  );
}
