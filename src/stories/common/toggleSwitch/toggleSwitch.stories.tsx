import ToggleSwitch, {
  ToggleSwitchProps,
} from "@/components/common/ToggleSwitch";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ToggleSwitch> = {
  title: "Common/ToggleSwitch",
  component: ToggleSwitch,
  parameters: {
    layout: "centered",
    docs: {
      canvas: {},
    },
  },
  argTypes: {
    connection: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<ToggleSwitchProps>;

// 기본 버튼 UI 확인
export const Default: Story = {
  args: {
    checked: false,
    connection: "connection",
  },
};
