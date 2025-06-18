import Button from "@/components/form-button";
import Input from "@/components/form-input";

export default function Settings() {
  return (
    <div className="flex flex-col gap-3 px-3 py-4">
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

      <div className="border rounded-md shadow-md border-slate-100">
        <div className="flex p-2">
          <h3 className="flex-1 text-lg font-bold">비밀번호</h3>
          <Button>저장</Button>
        </div>
        <div className="flex flex-col gap-3 p-2">
          <Input name="beforePw" errors={[]} placeholder={"현재비밀번호"} />
          <Input name="pw" errors={[]} placeholder={"비밀번호"} />
          <Input name="pwCheck" errors={[]} placeholder={"비밀번호확인"} />
        </div>
      </div>
    </div>
  );
}
