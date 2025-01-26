import { useState, useCallback } from "react";

const useModalState = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleModalState = useCallback(
    (state: boolean) => () => {
      setModalOpen(state);
    },
    []
  );

  return {
    isModalOpen,
    handleModalState,
  };
};

export default useModalState;
