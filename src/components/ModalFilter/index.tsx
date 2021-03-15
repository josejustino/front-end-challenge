import React from 'react';
import { useModalContext } from '../../contexts/ModalContext';

import {
  ContainerOverlay,
  ContainerModal,
  ButtonsGroup,
  ButtonCancel,
  ButtonConfirm,
} from './styles';

const FiltroModal: React.FC = () => {
  const { modalState, closeModal } = useModalContext();
  const { visible, payload } = modalState;
  console.log(modalState);

  return (
    <>
      {visible && (
        <ContainerOverlay>
          <ContainerModal>
            <span className="title">Filtro por Gênero</span>
            <div className="genders">
              {payload?.map(gender => (
                <span>{gender}</span>
              ))}
            </div>
            <ButtonsGroup>
              <ButtonCancel type="button" onClick={closeModal}>
                Cancelar
              </ButtonCancel>
              <ButtonConfirm type="button">Confirmar</ButtonConfirm>
            </ButtonsGroup>
          </ContainerModal>
        </ContainerOverlay>
      )}
    </>
  );
};

export default FiltroModal;
