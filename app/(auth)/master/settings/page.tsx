"use client";

import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/form-select";
import { planLabel } from "@/lib/constants/plan";

import { useUserStore } from "@/store/useUserStore";
import dayjs from "dayjs";
import { useState } from "react";
import PasswordChange from "@/components/modal/password-change";

// export const revalidate = 3600;//"use client";에서 사용못함

export default function Settings() {
  const user = useUserStore((state) => state.user);
  const statistical = [{ id: "1th", label: "1개월" }];
  const onChange = (id: string) => {
    console.log(id);
  };

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // 버튼 클릭 핸들러
  const handlePasswordChange = () => {
    setShowPasswordModal(true);
  };

  return (
    <div className="flex flex-col gap-3 px-3 py-4">
      <div className="border rounded-md shadow-md border-slate-100">
        <div className="flex p-2">
          <h3 className="flex-1 text-lg font-bold">가입정보</h3>
        </div>
        <div className="flex flex-col gap-3 p-2">
          <div className="flex">
            <p className="flex-1">가입일</p>
            <p className="flex-2">
              {dayjs(user?.created_at).format("YYYY/MM/DD")}
            </p>
          </div>
          <div className="flex">
            <p className="flex-1">이메일</p>
            <p className="flex-2">{user?.email}</p>
          </div>
          <div className="flex">
            <p className="flex-1">사용중인 상품</p>
            {user && (
              <p className="flex-2">{user.plan && planLabel[user.plan]}</p>
            )}
          </div>
          <div className="flex">
            <p className="flex-1">비밀번호 변경하기</p>
            <div className="flex-2">
              <Button
                variant="secondary"
                className={"text-sm"}
                onClick={handlePasswordChange}
              >
                변경하기
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-md shadow-md border-slate-100">
        <div className="flex p-2">
          <h3 className="flex-1 text-lg font-bold">상점정보</h3>
        </div>
        <div className="flex flex-col gap-3 p-2">
          <div>
            <p>상호명</p>
            <p></p>
          </div>
          <div>
            <p>주소</p>
            <p></p>
          </div>
        </div>
      </div>

      <div className="border rounded-md shadow-md border-slate-100">
        <div className="flex p-2">
          <h3 className="flex-1 text-lg font-bold">평균 수선 완료 기간</h3>
          <Button>저장</Button>
        </div>
        <div className="flex items-center gap-3 p-2 [&>div]:flex-1 ">
          <Input type="number" name="start" />
          <span className="">~</span>
          <Input type="number" name="end" />
          <p className="">일 소요</p>
        </div>
      </div>

      <div className="border rounded-md shadow-md border-slate-100">
        <div className="flex p-2">
          <h3 className="flex-1 text-lg font-bold">통계기간</h3>
          <Button>저장</Button>
        </div>
        <div className="flex items-center gap-3 p-2">
          <Select
            name="months"
            options={statistical}
            value={"1개월"}
            onChange={(id) => onChange(id)}
          />
          <p>부터 어제까지</p>
        </div>
      </div>

      {/* <Button className="h-12" onClick={() => userLogin()}>
        로그아웃
      </Button> */}
      {showPasswordModal && (
        <PasswordChange onClose={() => setShowPasswordModal(false)} />
      )}
    </div>
  );
}
