import { Meta, StoryObj } from "@storybook/react";
import ChatBubble from "@/components/feature/chat/ChatBubble";

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
    text: "안녕하세요!",
    timestamp: "오후 1:20",
    position: "left",
    type: "text",
  },
};

export const RightAligned: Story = {
  args: {
    text: "안녕하세요! 저는 오른쪽 정렬입니다.",
    timestamp: "오후 1:21",
    position: "right",
    type: "text",
  },
};

export const WithImage: Story = {
  args: {
    text: "",
    timestamp: "오후 1:22",
    position: "left",
    type: "image",
    content: "https://via.placeholder.com/150",
  },
};

export const WithVideo: Story = {
  args: {
    text: "",
    timestamp: "오후 1:23",
    position: "left",
    type: "video",
    content:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
  },
};

export const WithFile: Story = {
  args: {
    text: "파일 메시지입니다.",
    timestamp: "오후 1:24",
    position: "right",
    type: "file",
    content: "https://example.com/sample.pdf",
  },
};

export const LongText: Story = {
  args: {
    text: "이 메시지는 매우 긴 텍스트로 이루어져 있습니다. 여러 줄로 출력될 수 있으며, 텍스트가 길어지면 UI가 적절히 반응하도록 설정됩니다. Tailwind CSS의 유동적인 스타일을 활용해 동작을 확인해보세요.",
    timestamp: "오후 1:25",
    position: "right",
    type: "text",
  },
};
