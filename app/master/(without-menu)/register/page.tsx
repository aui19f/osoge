import dayjs from "dayjs";
import "dayjs/locale/ko";

import { getLoginUser } from "@/app/actions/getLoginUser"; // 서버 액션/함수로 가정
import RegisterForm from "@/app/master/(without-menu)/register/RegisterForm";

export default async function RegisterPage() {
  dayjs.locale("ko");
  // const user = await getLoginUser(); // 유저 정보를 서버에서 미리 가져옴
  // const store = user?.store[0];

  return (
    <div className="flex flex-col h-screen gap-4 p-4">
      <p className="text-xl font-bold">
        {dayjs().format("YYYY년 M월 D일 dddd")}
      </p>
      {/* <RegisterForm storeId={store?.id || ""} /> */}
      <RegisterForm storeId={"123456"} />
    </div>
  );
}
