import Badge, { BadgeProps } from "@/components/common/Badge";
import DefaultBadge from "@/assets/images/default_badge.svg";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Badge> = {
  title: "hooks/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      canvas: {}
    }
  },
  argTypes: {
    size: {
      control: "text",
      description: "뱃지의 크기를 설정합니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "60px" }
      }
    }
  }
};

export default meta;

type Story = StoryObj<BadgeProps>;

export const Default: Story = {
  args: {
    size: "30px",
    src: DefaultBadge
  }
};
