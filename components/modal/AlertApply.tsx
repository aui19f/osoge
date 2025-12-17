import Alert from "@/components/modal/Alert";

interface alertApplyProps {
  code: number;
  onClose: () => void;
}
export default function AlertApply({ code, onClose }: alertApplyProps) {
  console.log("code", code);
  if (code === 200) {
    return (
      <Alert title={"완료되었습니다"} icon="checked" onClose={onClose}>
        <p className="text-center">
          정상 접수되었습니다.
          <br />
          빠른시일내에 답변드리겠습니다.
          <br />
          감사합니다.
        </p>
      </Alert>
    );
  } else {
    return (
      <Alert title="문제가 발생하였습니다." icon="error" onClose={onClose}>
        <p className="text-center">
          작성된 문의 사항이 저장되지 않았습니다.
          <br />
          잠시후 다시 시도해주시기 바랍니다.
        </p>
      </Alert>
    );
  }
}
