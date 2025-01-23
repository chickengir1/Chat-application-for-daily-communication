import { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import BottomNavigation from "@/components/ui/BottomNavigation";

const meta: Meta<typeof BottomNavigation> = {
  title: "UI/BottomNavigation",
  component: BottomNavigation,
  tags: ["autodocs"],
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 600,
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof BottomNavigation>;

export const Default: Story = {
  args: {},
};
