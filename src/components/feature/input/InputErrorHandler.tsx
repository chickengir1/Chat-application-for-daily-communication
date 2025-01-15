interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <p className="absolute top-[calc(100%+2px)] text-[11px] text-[#E92B2B]">
      {message}
    </p>
  );
};

export default ErrorMessage;
