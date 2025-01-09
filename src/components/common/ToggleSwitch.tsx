export interface ToggleSwitchProps {
  width?: string | number;
  height?: string | number;
}

const ToggleSwitch = ({
  width = "54px",
  height = "28px"
}: ToggleSwitchProps) => {
  return (
    <label
      style={{ width, height }}
      className="inline-flex items-center cursor-pointer"
    >
      <input type="checkbox" className="sr-only peer" />
      <div
        className="relative w-[56px] h-[28px] bg-[#e7e7e7] 
                      rounded-full peer
                      peer-checked:after:left-[calc(100%-26px)]
                      after:content-['']
                      after:absolute after:top-[2px]
                      after:start-[2px]
                      after:bg-white after:border-gray-300 after:border
                      after:rounded-full after:h-[24px] after:w-[24px] after:transition-all
                      dark:border-gray-600 peer-checked:bg-[#00FF00]"
      ></div>
    </label>
  );
};

export default ToggleSwitch;
