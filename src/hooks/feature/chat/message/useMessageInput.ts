import useSendMessage from "./useSendMessage";

const useMessageInput = (roomId: string) => {
  const { value, onChange, onKeyDown, handleSendMessage } = useSendMessage({
    roomId,
  });

  return {
    value,
    onChange,
    onKeyDown,
    handleSendMessage,
  };
};

export default useMessageInput;
