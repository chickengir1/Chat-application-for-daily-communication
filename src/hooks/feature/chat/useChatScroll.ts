import { RefObject, useEffect } from "react";
import { Message } from "@/stores/chatStore";

interface UseChatScrollProps {
  messages: Message[];
  query: string;
  isSearchActive: boolean;
  containerRef: RefObject<HTMLDivElement>;
  bottomRef: RefObject<HTMLDivElement>;
}

export const useChatScroll = ({
  messages,
  query,
  isSearchActive,
  containerRef,
  bottomRef,
}: UseChatScrollProps) => {
  useEffect(() => {
    if (!isSearchActive && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (!query || !containerRef.current) {
      return;
    }

    const hasResults = messages.some((message) =>
      message.message.toLowerCase().includes(query.toLowerCase())
    );

    if (!hasResults) {
      return;
    }

    const scrollToHighlight = () => {
      const highlightElements =
        containerRef.current?.querySelectorAll(".bg-yellow-50");
      const firstHighlight = highlightElements?.[0];

      if (firstHighlight) {
        firstHighlight.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    };

    const timer = setTimeout(scrollToHighlight, 100);
    return () => clearTimeout(timer);
  }, [query, messages, isSearchActive, containerRef, bottomRef]);
};
