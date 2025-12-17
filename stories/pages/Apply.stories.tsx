import Apply from "@/app/apply/page";
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Apply> = {
  title: "Pages/Apply", // Storybook 사이드바 경로
  component: Apply,
  parameters: {
    layout: "fullscreen", // 페이지이므로 전체 화면 사용
    viewport: {
      defaultViewport: "iphone14",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Apply>;
export const Default: Story = {};
export const FilledForm: Story = {
  render: () => (
    <div className="flex flex-col h-screen gap-2 p-3">
      <form className="flex-1">
        <div className="flex flex-col gap-2 pb-2 border-b border-b-gray-200">
          <div className="flex items-center">
            <p className="w-36">*성명</p>
            <Input name="" value="홍길동" readOnly onChange={() => {}} />
          </div>

          <div className="flex items-center">
            <p className="w-36">핸드폰</p>
            <Input name="" value="010-1234-5678" readOnly onChange={() => {}} />
          </div>

          <div className="flex items-center">
            <p className="w-36">*이메일</p>
            <Input
              name=""
              value="test@example.com"
              readOnly
              onChange={() => {}}
            />
          </div>
        </div>
      </form>
    </div>
  ),
};
export const ButtonDisabled: Story = {
  render: () => (
    <div className="p-3">
      <Button disabled>문의접수하기</Button>
    </div>
  ),
};

export const ButtonLoading: Story = {
  render: () => (
    <div className="p-3">
      <Button>문의접수하기</Button>
    </div>
  ),
};
