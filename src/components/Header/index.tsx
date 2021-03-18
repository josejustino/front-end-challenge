import React from 'react';
import { Link } from 'react-router-dom';

import { useModalContext } from '../../contexts/ModalContext';

import { Container } from './styles';

interface HeaderProps {
  hasFilter?: boolean;
}

const Header: React.FC<HeaderProps> = ({ hasFilter = true }) => {
  const { openModal } = useModalContext();

  return (
    <Container>
      <div>
        <h1>
          <Link to="/">Movies</Link>
        </h1>
        {hasFilter && (
          <button type="button" onClick={openModal}>
            Filter
          </button>
        )}
      </div>
    </Container>
  );
};

export default Header;
