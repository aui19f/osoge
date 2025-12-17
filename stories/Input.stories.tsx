import Input from "@/components/forms/Input";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Input> = {
  title: "Forms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    sizes: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },

    onClick: { action: "chnage" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// 기본 Input
export const Default: Story = {
  args: {
    name: "default-input",
    placeholder: "값을 입력하세요",
    autoComplete: "off",
    sizes: "md",
    disabled: false,
  },
};

// Disabled Input
export const Disabled: Story = {
  args: {
    name: "disabled-input",
    placeholder: "비활성화 상태",
    disabled: true,
    autoComplete: "off",
    sizes: "md",
  },
};

export const Large: Story = {
  args: { sizes: "lg" },
};
export const Medium: Story = {
  args: { sizes: "md" },
};
export const Small: Story = {
  args: { sizes: "sm" },
};
