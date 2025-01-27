/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, RefObject } from "react";

interface UseInfiniteScrollProps {
  root?: RefObject<HTMLElement>;
  element: RefObject<HTMLElement>;
  onScroll?: () => Promise<void> | void;
}

export const useInfiniteScroll = (
  { root, element, onScroll }: UseInfiniteScrollProps,
  dependencies: any[] = []
) => {
  useEffect(() => {
    if (!element.current) {
      return;
    }

    const options = {
      root: root?.current || document.querySelector("#root"),
      rootMargin: "0px",
      threshold: 1.0,
    };

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          if (onScroll) {
            onScroll();
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    observer.observe(element.current);

    return () => {
      if (observer && element.current) {
        observer.unobserve(element.current);
      }
    };
  }, [root, element, onScroll, ...dependencies]);
};
