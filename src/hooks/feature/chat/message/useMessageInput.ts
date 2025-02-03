import useSendMessage from "./useSendMessage";

const useMessageInput = (roomId: string) => {
  const { value, onChange, onKeyDown, handleSendMessage, setValue } =
    useSendMessage({
      roomId,
    });

  return {
    value,
    onChange,
    onKeyDown,
    handleSendMessage,
    setValue,
  };
};

export default useMessageInput;
