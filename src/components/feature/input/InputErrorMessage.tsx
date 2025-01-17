interface InputErrorMessageProps {
  message?: string;
}

const InputErrorMessage = ({ message }: InputErrorMessageProps) => {
  if (!message) return null;

  return (
    <p className="absolute top-[calc(100%+2px)] text-[11px] text-[#ff6161]">
      {message}
    </p>
  );
};

export default InputErrorMessage;
