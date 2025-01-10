import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import Input from "@/components/common/Input";

const meta: Meta<typeof Input> = {
  title: "Common/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "changed" },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    value: "",
    placeholder: "Enter text...",
    className: "border p-2 rounded bg-gray-100",
    type: "text",
    onChange: (event) => console.log(event.target.value),
  },
  play: async ({ canvasElement }) => {
    //  1) 스토리 내에서 렌더링된 canvas(화면)에서 요소를 찾기
    const canvas = within(canvasElement);
    const input = await canvas.findByPlaceholderText("Enter text...");

    //  2) 사용자 이벤트를 시뮬레이션하여 텍스트를 입력
    await userEvent.type(input, "Hello Storybook!");

    //  3) 입력값을 모두 지우는 동작을 테스트
    await userEvent.clear(input);
    expect((input as HTMLInputElement).value).toBe("");

    //  4) 다시 다른 텍스트를 입력
    await userEvent.type(input, "Typed Again!");
  },
};

export const PasswordInput: Story = {
  render: (args) => <Input {...args} />,
  args: {
    value: "",
    placeholder: "Enter password...",
    type: "password",
    onChange: (event) => console.log(event.target.value),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1) 비밀번호 placeholder를 가진 인풋 찾기
    const input = await canvas.findByPlaceholderText("Enter password...");
    expect(input).toBeInTheDocument();

    // 2) type이 password인지 확인
    expect(input.getAttribute("type")).toBe("password");

    // 3) "SecretPass123!" 입력 시뮬레이션
    await userEvent.type(input, "SecretPass123!");
  },
};

export const DisabledInput: Story = {
  args: {
    value: "",
    placeholder: "This input is disabled",
    type: "text",
    onChange: (event) => console.log(event.target.value),
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvase = within(canvasElement);
    const input = await canvase.findByPlaceholderText("This input is disabled");

    // 1) 비활성화 상태인지 확인
    expect(input).toBeDisabled();

    // 2) 사용자 입력 시도
    await userEvent.type(input, "Hello Story");
  },
};
