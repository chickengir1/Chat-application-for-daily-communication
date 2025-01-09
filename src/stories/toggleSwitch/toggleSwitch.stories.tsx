import ToggleSwitch, {
  ToggleSwitchProps
} from "@/components/common/ToggleSwitch";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ToggleSwitch> = {
  title: "hooks/ToggleSwitch",
  component: ToggleSwitch,
  parameters: {
    layout: "centered",
    docs: {
      canvas: {}
    }
  },
  argTypes: {
    connection: { control: "text" } // `connection`을 문자열로 제어
  }
};

export default meta;

type Story = StoryObj<ToggleSwitchProps>;

// 기본 버튼 UI 확인
export const Default: Story = {
  args: {
    checked: false, // 기본 상태는 `false`
    connection: "connection"
  }
};
