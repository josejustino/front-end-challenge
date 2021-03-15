import React from 'react';

import { useModalContext } from '../../contexts/ModalContext';

import { Container } from './styles';

const Header: React.FC = () => {
  const { openModal } = useModalContext();
  const testModal = () => openModal();

  return (
    <Container>
      <div>
        <span>Movies</span>
        <button type="button" onClick={testModal}>
          Filter
        </button>
      </div>
    </Container>
  );
};

export default Header;
