import React from 'react';

import { useModalContext } from '../../contexts/ModalContext';

import { Container } from './styles';

const Header: React.FC = () => {
  const { openModal } = useModalContext();
  const testModal = () =>
    openModal({
      payload: [
        'Ação',
        'Aventura',
        'Comédia',
        'Ficção',
        'Romance',
        'Fantasia',
        'Drama',
        'Guerra',
      ],
    });

  return (
    <Container>
      <div>
        <span>Movies</span>
        <button type="button" onClick={testModal}>
          Filtrar
        </button>
      </div>
    </Container>
  );
};

export default Header;
