import dayjs from "dayjs";
import "dayjs/locale/ko";

import RegisterForm from "@/app/master/(without-menu)/register/RegisterForm";

export default async function RegisterPage() {
  dayjs.locale("ko");

  return (
    <div
      className="flex flex-col gap-4 p-4 h-dvh overflow: hidden; bg-gray-50"
      style={{ touchAction: "manipulation" }}
    >
      <p className="text-xl font-bold">
        {dayjs().format("YYYY년 M월 D일 dddd")}
      </p>
      <RegisterForm storeId={"9e97b969-ff73-4f5d-89e7-b357a38e5da2"} />
    </div>
  );
}
