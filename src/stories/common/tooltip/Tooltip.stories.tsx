import { Meta, StoryObj } from "@storybook/react";
import Tooltip from "@/components/common/Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Common/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    text: "기본 툴팁입니다.",
    children: (
      <div className="p-3 bg-blue-500 text-white rounded">Default Tooltip</div>
    ),
  },
};

export const LongText: Story = {
  args: {
    text: "이 툴팁은 굉장히 긴 텍스트를 포함하고 있습니다. 다양한 내용이 표시될 수 있습니다.",
    children: (
      <div className="p-3 bg-green-500 text-white rounded">long text</div>
    ),
  },
};
