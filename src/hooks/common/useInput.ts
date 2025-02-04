import React, { useState } from "react";

export default function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  const [previousKey, setPreviousKey] = useState<string>("");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setValue(e.target.value);

  const reset = () => setValue("");
  const onKeyDown =
    (callback: () => void) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Shift") {
        setPreviousKey("Shift");
        return;
      }

      if (e.key === "Enter" && value.trim()) {
        if (!e.nativeEvent.isComposing && previousKey !== "Shift") {
          e.preventDefault();
          callback();
          reset();
        }
      }

      if (e.key !== "Shift") {
        setPreviousKey("");
      }
    };

  return { value, onChange, reset, onKeyDown, setValue };
}
