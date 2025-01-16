import { Meta, StoryObj } from "@storybook/react";
import ChatWindow from "@/components/feature/chat/ChatWindow";

const meta: Meta<typeof ChatWindow> = {
  title: "feature/ChatWindow",
  component: ChatWindow,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ChatWindow>;

const sampleMessages = [
  {
    sender: "일론머스크",
    userId: 1,
    message: "Hey There!",
    createdAt: "Today, 8:33 PM",
  },
  {
    sender: "me",
    userId: 101,
    message: "Hello!",
    createdAt: "Today, 8:34 PM",
  },
];

const noneMessages = [
  {
    sender: "일론머스크",
    userId: 1,
    message: "",
    createdAt: "Today, 8:33 PM",
  },
  {
    sender: "me",
    userId: 101,
    message: "",
    createdAt: "Today, 8:34 PM",
  },
];

const longMessage = "이 메시지는 매우 긴 텍스트로 이루어져 있습니다.".repeat(5);

export const Default: Story = {
  args: {
    chatData: sampleMessages,
    currentUserId: 101,
  },
};

export const NoMessages: Story = {
  args: {
    chatData: noneMessages,
    currentUserId: 101,
  },
};

export const LongMessages: Story = {
  args: {
    chatData: [
      {
        sender: "일론머스크",
        userId: 1,
        message: longMessage,
        createdAt: "Today, 8:33 PM",
      },
      {
        sender: "me",
        userId: 101,
        message: longMessage,
        createdAt: "Today, 8:34 PM",
      },
    ],
    currentUserId: 101,
  },
};
