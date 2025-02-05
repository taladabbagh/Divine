import React, { createContext, useState, ReactNode } from "react";
import ErrorModal from "../components/ErrorModal";

interface ModalContextType {
  openModal: (message: string) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

interface ModalProviderProps {
  children: ReactNode; 
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const openModal = (message: string) => {
    setError(message);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setError(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ErrorModal errorMessage={error || ""} open={open} onClose={closeModal} />
    </ModalContext.Provider>
  );
};