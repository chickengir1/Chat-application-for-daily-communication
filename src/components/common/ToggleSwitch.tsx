export interface ToggleSwitchProps {
  width: string;
  height: string;
  connection: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ToggleSwitch = ({
  width = "54px",
  height = "28px",
  connection = "default",
  checked = false,
  onChange
}: ToggleSwitchProps) => {
  return (
    <label
      className="inline-flex items-center cursor-pointer"
      htmlFor={connection}
    >
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        id={connection}
        checked={checked}
        onChange={onChange}
      />
      <div
        className="relative bg-[#e7e7e7] 
        rounded-full peer
        peer-checked:after:left-[calc(100%-26px)]
        after:content-['']
        after:absolute after:top-[2px]
        after:start-[2px]
        after:bg-white after:border-gray-300 after:border
        after:rounded-full after:h-[24px] after:w-[24px] after:transition-all
        dark:border-gray-600 peer-checked:bg-[#00FF00]"
        style={{ width, height }}
      ></div>
    </label>
  );
};

export default ToggleSwitch;
