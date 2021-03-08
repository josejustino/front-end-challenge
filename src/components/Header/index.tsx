import React from 'react';

import { Container } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <div>
        <span>ITMovies</span>
        <span>Filtrar</span>
      </div>
    </Container>
  );
};

export default Header;
