import React from 'react';

import {
  ContainerOverlay,
  ContainerModal,
  ButtonsGroup,
  ButtonCancel,
  ButtonConfirm,
} from './styles';

interface ModalProps {
  isModalOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ isModalOpen, children }) => {
  return (
    <ContainerOverlay>
      <ContainerModal>
        <span>Gêneros</span>
        <ButtonsGroup>
          <ButtonCancel type="button">Cancelar</ButtonCancel>
          <ButtonConfirm type="button">Confirmar</ButtonConfirm>
        </ButtonsGroup>
      </ContainerModal>
    </ContainerOverlay>
  );
};

export default Modal;
