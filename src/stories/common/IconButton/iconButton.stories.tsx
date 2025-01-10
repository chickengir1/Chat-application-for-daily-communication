import { Meta, StoryObj } from "@storybook/react";
import IconButton from "@/components/common/IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Common/IconButton", // Storybook의 카테고리 및 컴포넌트 이름
  component: IconButton,
  parameters: {
    layout: "centered", // Storybook에서 중앙 정렬
  },
  argTypes: {
    type: {
      control: { type: "select" }, // `select`로 버튼 타입 선택 가능
      options: ["button", "submit", "reset"],
      description: "버튼의 타입을 정의합니다.",
    },
    width: {
      control: { type: "text" },
      description: "버튼의 가로 크기",
    },
    height: {
      control: { type: "text" },
      description: "버튼의 세로 크기",
    },
    alt: {
      control: { type: "text" },
      description: "이미지의 대체 텍스트",
    },
    disabled: {
      control: { type: "boolean" },
      description: "버튼 비활성화 여부",
    },
    onClick: {
      action: "clicked", // 클릭 이벤트를 Storybook 액션으로 기록
      description: "클릭 이벤트 핸들러",
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

// 기본 아이콘 버튼
export const Default: Story = {
  args: {
    type: "button",
    width: "60px",
    height: "60px",
    alt: "Test Icon",
    disabled: false,
    onClick: () => {
      console.log("IconButton clicked");
    },
  },
};
