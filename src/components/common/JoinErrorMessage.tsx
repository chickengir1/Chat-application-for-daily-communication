const JoinErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="absolute top-[calc(100%+2px)] text-[11px] text-[#E92B2B]">
      {children}
    </p>
  );
};

export default JoinErrorMessage;
