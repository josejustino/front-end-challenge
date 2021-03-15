import { createContext, useContext, useState } from 'react';

interface ModalState {
  visible: boolean;
  payload?: Array<string>;
}

interface ModalContextData {
  openModal(props: OpenModalProps): void;
  closeModal(): void;
  modalState: ModalState;
}

interface OpenModalProps {
  payload?: Array<string>;
}

const ModalContext = createContext({} as ModalContextData);

const ModalProvider: React.FC = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>({ visible: false });

  const openModal = ({ payload }: OpenModalProps) =>
    setModalState({ payload, visible: true });
  const closeModal = () => setModalState({ visible: false });

  console.log(modalState);

  return (
    <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModalContext = (): ModalContextData => {
  const context = useContext(ModalContext);

  return context;
};

export { useModalContext, ModalProvider };
