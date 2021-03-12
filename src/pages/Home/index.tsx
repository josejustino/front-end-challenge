import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import { API_KEY } from '../../config/index';

import Header from '../../components/Header';
import DataList from '../../components/DataList';
import Modal from '../../components/Modal';

import { Container, Main, Content, Section } from './styles';

interface PopularMovie {
  id: number;
  poster_path: string;
  title: string;
}

const Home: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<PopularMovie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    api
      .get(`movie/popular`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          page: 1,
        },
      })
      .then(({ data, status }) => {
        const { results } = data;

        if (status === 200) {
          setPopularMovies(results);
        }
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Main>
          <Content>
            <Section>
              <DataList popularMovies={popularMovies} />
            </Section>
          </Content>
        </Main>
      </Container>
      <Modal isModalOpen={isModalOpen} />
    </>
  );
};

export default Home;
