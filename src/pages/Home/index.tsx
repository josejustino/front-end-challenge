import React from 'react';

import Header from '../../components/Header';
import DataList from '../../components/DataList';

import { Container, Content } from './styles';

const Home: React.FC = () => {
  return (
    <>
      <Header />

      <Container>
        <Content>
          <DataList />
        </Content>
      </Container>
    </>
  );
};

export default Home;
