import Modal from "@/components/common/Modal";
import { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";

const meta: Meta<typeof Modal> = {
  title: "Common/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    onClose: { action: "changed" },
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log("close"),
    children: (
      <div>
        <h2 className="mb-4 text-xl font-bold">Modal Content</h2>
        <p className="mb-4 text-gray-700">모달 내용</p>
      </div>
    ),
    overlayClassName:
      "bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center z-50",
    contentClassName: "bg-white rounded-lg p-6 shadow-lg w-96 relative",
    modalClassName:
      "absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1) 모달 내용 확인
    const modalContent = await canvas.findByText("Modal Content");
    expect(modalContent).toBeInTheDocument();

    // 2) 모달 닫기 버튼 클릭
    const closeButton = await canvas.findByRole("button");
    await userEvent.click(closeButton);
  },
};
