export default function SendCheck() {
  const store = "누벨맞춤옷수선";
  const date = "YYYY/MM/DD";
  const address = "경기 성남시 분당구 판교공원로5길 26-1 101호";
  const phone = "000-0000-0000";

  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center ">
      <div className="shadow-2xl w-80">
        <div className="flex flex-col items-center py-10 bg-slate-50 gap-2.5 rounded-t-lg p-6">
          <div className="bg-gray-400 size-16"></div>
          <h3 className="text-xl font-bold text-blue-400">
            알림톡을 전송하시겠습니까?
          </h3>
        </div>

        <div className="bg-slate-100 px-10 py-6 flex flex-col gap-2.5">
          <p>안녕하세요. {store} 입니다.</p>
          <p>고객님께서 {date}에 접수하신 수선이 완료되었습니다.</p>
          <div className="*:text-sm">
            <p>✓ 주소: {address}</p>
            <p>✓ 연착처: {phone}</p>
          </div>
          <p>감사합니다.</p>
        </div>
        <div className="bg-slate-100 p-4 flex gap-2.5 rounded-b-lg">
          <button className="flex-1 h-12 border rounded-lg bg-slate-50 border-slate-400 text-slate-400">
            취소
          </button>
          <button className="flex-1 h-12 bg-blue-400 rounded-lg text-blue-50">
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
