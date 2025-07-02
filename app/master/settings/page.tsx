import { userLogin } from "@/app/master/settings/actions";
import Button from "@/components/form-button";
import getSession from "@/lib/sesstion";
import { fetchUserById } from "@/lib/user";
import { userInfo } from "os";
import { useEffect } from "react";
// export const revalidate = 3600;//"use client";에서 사용못함

export default async function Settings() {
  const user = userInfo();

  return (
    <div className="flex flex-col gap-3 px-3 py-4">
      <div className="border rounded-md shadow-md border-slate-100">
        <div className="flex p-2">
          <h3 className="flex-1 text-lg font-bold">가입정보</h3>
        </div>
        <div className="flex flex-col gap-3 p-2">
          <div>
            <p>가입일</p>
            <p></p>
          </div>
          <div>
            <p>이메일</p>
            <p></p>
          </div>
          <div>
            <p>비밀번호 변경하기</p>
            <p></p>
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
          <h3 className="flex-1 text-lg font-bold">통계기간</h3>
          <Button>저장</Button>
        </div>
        <div className="flex items-center gap-3 p-2">
          <div></div>
          <p>부터 어제까지</p>
        </div>
      </div>

      {/* <Button className="h-12" onClick={() => userLogin()}>
        로그아웃
      </Button> */}
    </div>
  );
}

// 가입일, 이메일, 롤,
// 상점 정보는 아직 없음
