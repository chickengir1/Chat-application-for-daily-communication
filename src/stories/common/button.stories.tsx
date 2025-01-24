import Button, { ButtonProps } from "@/components/common/Button";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Common/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      canvas: {},
    },
  },
  argTypes: {
    width: {
      control: "text",
      description: "The width of the button",
      table: {
        type: { summary: "string | number" },
        defaultValue: { summary: "auto" },
      },
    },
    height: {
      control: "text",
      description: "The height of the button",
      table: {
        type: { summary: "string | number" },
        defaultValue: { summary: "auto" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

// 기본 버튼 UI 확인
export const Default: Story = {
  args: {
    text: "Click Me",
    type: "button",
  },
};

// 비활성화된 버튼 UI 확인 (disabled 추가)
export const DisabledButton: Story = {
  args: {
    text: "Disabled",
    type: "button",
    disabled: true,
  },
};
