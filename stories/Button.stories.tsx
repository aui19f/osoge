import Button from "@/components/forms/Button";
import type { Meta, StoryObj } from "@storybook/nextjs";

// import type { FormIButton } from "@/types/forms";

const meta: Meta<typeof Button> = {
  title: "Forms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "primary",
        "primary-line",
        "secondary",
        "secondary-line",
        "dark",
        "dark-line",
      ],
    },
    sizes: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    children: { control: "text" },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: "기본버튼", variant: "primary", sizes: "md" },
};

export const PrimaryLine: Story = {
  args: { children: "PrimaryLine", variant: "primary-line", sizes: "md" },
};

export const Secondary: Story = {
  args: { children: "Secondary", variant: "secondary", sizes: "md" },
};
export const SecondaryLine: Story = {
  args: { children: "SecondaryLine", variant: "secondary-line", sizes: "md" },
};
export const Dark: Story = {
  args: { children: "Danger", variant: "dark", sizes: "md" },
};
export const DarkLine: Story = {
  args: { children: "DangerLine", variant: "dark-line", sizes: "md" },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    variant: "disabled",
    sizes: "md",
    disabled: true,
  },
};

export const Large: Story = {
  args: { children: "Large", variant: "secondary-line", sizes: "lg" },
};
export const Medium: Story = {
  args: { children: "Medium", variant: "secondary-line", sizes: "md" },
};
export const Small: Story = {
  args: { children: "Small", variant: "secondary-line", sizes: "sm" },
};
