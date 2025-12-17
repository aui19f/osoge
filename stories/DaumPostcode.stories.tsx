import DaumPostcode from "@/components/forms/DaumPostcode";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof DaumPostcode> = {
  title: "Forms/DaumPostcode",
  component: DaumPostcode,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof DaumPostcode>;

export const Default: Story = {
  args: {
    onChange: (address) => {
      console.log("선택된 주소:", address);
    },
  },
};
