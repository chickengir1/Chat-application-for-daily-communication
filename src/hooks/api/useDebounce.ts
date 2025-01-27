import { useCallback, useRef } from "react";

export const useDebounce = (callback: () => void, time: number) => {
  const ref = useRef<NodeJS.Timeout | null>(null);

  const debounceFunction = useCallback(() => {
    if (ref.current) {
      clearTimeout(ref.current);
    }

    ref.current = setTimeout(callback, time);
  }, [callback]);

  return debounceFunction;
};
