export interface ToggleSwitchProps {
  width?: string;
  height?: string;
  connection: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ToggleSwitch = ({
  width = "54px",
  height = "28px",
  connection = "default",
  checked = false,
  onChange,
}: ToggleSwitchProps) => {
  return (
    <label
      className="inline-flex cursor-pointer items-center"
      htmlFor={connection}
    >
      <input
        type="checkbox"
        value=""
        className="peer sr-only hidden"
        id={connection}
        checked={checked}
        onChange={onChange}
      />
      <div
        className="peer relative rounded-full bg-[#e7e7e7] after:absolute after:start-[2px] after:top-[2px] after:h-[24px] after:w-[24px] after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#48cd48] peer-checked:after:left-[calc(100%-26px)] dark:border-gray-600"
        style={{ width, height }}
      ></div>
    </label>
  );
};

export default ToggleSwitch;
