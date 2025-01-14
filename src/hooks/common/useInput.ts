import React, { useState } from "react";

export default function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setValue(e.target.value);

  const reset = () => setValue("");

  const onKeyDown =
    (callback: () => void) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && value.trim()) {
        callback();
        reset();
      }
    };

  return { value, onChange, reset, onKeyDown };
}
