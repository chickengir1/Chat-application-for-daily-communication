interface InputErrorMessageProps {
  message?: string;
  color?: string; // 메시지 색상 설정
}

const InputErrorMessage = ({
  message,
  color = "#ff6161",
}: InputErrorMessageProps) => {
  if (!message) return null;

  return (
    <p className="absolute top-[calc(100%+2px)] text-[11px]" style={{ color }}>
      {message}
    </p>
  );
};

export default InputErrorMessage;
