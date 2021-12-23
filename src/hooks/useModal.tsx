import { createContext, useContext, useState } from 'react';

interface ModalState {
  visible: boolean;
}

interface ModalContextData {
  openModal(): void;
  closeModal(): void;
  modalState: ModalState;
}

export const ModalContext = createContext<ModalContextData>(
  {} as ModalContextData,
);

export const ModalProvider: React.FC = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>({ visible: false });

  const openModal = () => setModalState({ visible: true });
  const closeModal = () => setModalState({ visible: false });

  return (
    <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export function useModal(): ModalContextData {
  const context = useContext(ModalContext);

  return context;
}
