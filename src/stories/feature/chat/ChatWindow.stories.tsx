import { Meta, StoryObj } from "@storybook/react";
import ChatWindow from "@/components/feature/chat/ChatWindow";
import { Message } from "@/utils/chatInterface";

const meta: Meta<typeof ChatWindow> = {
  title: "feature/ChatWindow",
  component: ChatWindow,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ChatWindow>;

const sampleMessages: Message[] = [
  {
    id: 1,
    sender: "일론머스크",
    text: "Hey There!",
    timestamp: "Today, 8:33 PM",
    position: "left",
    type: "text",
  },
  {
    id: 2,
    sender: "me",
    text: "Hello!",
    timestamp: "Today, 8:34 PM",
    position: "right",
    type: "text",
  },
];

const noneMessages: Message[] = [
  {
    id: 1,
    sender: "일론머스크",
    text: "",
    timestamp: "Today, 8:33 PM",
    position: "left",
    type: "text",
  },
  {
    id: 2,
    sender: "me",
    text: "Hello!",
    timestamp: "Today, 8:34 PM",
    position: "right",
    type: "text",
  },
];

const longMessage: string = "아주아주긴메세지입니다".repeat(10);

const mediaMessages: Message[] = [
  {
    id: 1,
    sender: "일론머스크",
    text: "",
    timestamp: "Today, 8:35 PM",
    position: "left",
    type: "image",
    content: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    sender: "me",
    text: "",
    timestamp: "Today, 8:36 PM",
    position: "right",
    type: "video",
    content:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
  },
  {
    id: 3,
    sender: "me",
    text: "파일 메시지입니다.",
    timestamp: "Today, 8:37 PM",
    position: "right",
    type: "file",
    content: "https://example.com/sample.pdf",
  },
];

const baseArgs = {
  inputValue: "",
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) =>
    console.log(e.target.value),
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Enter Key Pressed");
    }
  },
  onSend: () => console.log("Message Sent"),
};

export const Default: Story = {
  args: {
    ...baseArgs,
    messages: sampleMessages,
  },
};

export const NoMessages: Story = {
  args: {
    ...baseArgs,
    messages: noneMessages,
  },
};

export const LongMessages: Story = {
  args: {
    ...baseArgs,
    messages: [
      {
        id: 1,
        sender: "일론머스크",
        text: longMessage,
        timestamp: "Today, 8:33 PM",
        position: "left",
        type: "text",
      },
      {
        id: 2,
        sender: "me",
        text: longMessage,
        timestamp: "Today, 8:34 PM",
        position: "right",
        type: "text",
      },
    ],
  },
};

export const MediaMessages: Story = {
  args: {
    ...baseArgs,
    messages: mediaMessages,
  },
};
