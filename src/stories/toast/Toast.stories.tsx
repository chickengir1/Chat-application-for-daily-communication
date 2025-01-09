import { Meta, StoryObj } from "@storybook/react";
import Toast, { ToastProps } from "@/components/common/Toast";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta: Meta<typeof Toast> = {
  title: "components/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "radio",
      options: ["success", "error"],
    },
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 100,
      },
    },
  },
};

export default meta;

type Story = StoryObj<ToastProps>;

export const SuccessToast: Story = {
  args: {
    message: "Operation was successful!",
    type: "success",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1) Toast 메세지 확인
    const toastMessage = await canvas.findByText("Operation was successful!");
    expect(toastMessage).toBeInTheDocument();

    // 2) Toast 컨테이너 확인
    const toastContainer = toastMessage.closest("div.bg-green-500");

    // 3) Toast 타입 확인
    expect(toastContainer).not.toBeNull();
    if (toastContainer) {
      expect(toastContainer).toHaveClass("bg-green-500");
    }
  },
};

export const ErrorToast: Story = {
  args: {
    message: "Something went wrong!",
    type: "error",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1) Toast 메시지 확인
    const toastMessage = await canvas.findByText("Something went wrong!");
    expect(toastMessage).toBeInTheDocument();

    // 2) Toast 컨테이너 확인
    const toastContainer = toastMessage.closest("div.bg-red-500");

    // 3) Toast 타입 확인
    expect(toastContainer).not.toBeNull();
    if (toastContainer) {
      expect(toastContainer).toHaveClass("bg-red-500");
    }
  },
};
