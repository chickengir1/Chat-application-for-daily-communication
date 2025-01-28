import { Meta, StoryObj } from "@storybook/react";
import ChatBubble from "@/components/feature/chat/message/ChatBubble";

const meta: Meta<typeof ChatBubble> = {
  title: "Common/ChatBubble",
  component: ChatBubble,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ChatBubble>;

export const Default: Story = {
  args: {
    sender: "사용자A",
    message: "안녕하세요!",
    timestamp: "오후 1:20",
    isCurrentUser: false,
  },
};

export const RightAligned: Story = {
  args: {
    sender: "사용자B",
    message: "안녕하세요! 저는 오른쪽 정렬입니다.",
    timestamp: "오후 1:21",
    isCurrentUser: true,
  },
};

export const LongText: Story = {
  args: {
    sender: "사용자C",
    message:
      "이 메시지는 매우 긴 텍스트로 이루어져 있습니다. 여러 줄로 출력될 수 있으며, 텍스트가 길어지면 UI가 적절히 반응하도록 설정됩니다. Tailwind CSS의 유동적인 스타일을 활용해 동작을 확인해보세요.",
    timestamp: "오후 1:25",
    isCurrentUser: true,
  },
};
