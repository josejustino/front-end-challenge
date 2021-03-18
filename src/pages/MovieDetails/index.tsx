import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../components/Header';

import api from '../../services/api';

import { API_KEY } from '../../config';

import { Container, Main, Section, Content } from './styles';

interface ParamProps {
  id: string;
}

interface MovieDatailsProps {
  id: number;
  backdrop_path: string;
}

const MovieDetails: React.FC<MovieDatailsProps> = () => {
  const [movieDetails, setMovieDetails] = useState<MovieDatailsProps>(
    {} as MovieDatailsProps,
  );

  const { id } = useParams<ParamProps>();

  console.log(movieDetails.backdrop_path);

  useEffect(() => {
    api
      .get(`movie/${id}`, {
        params: {
          api_key: API_KEY,
          language: 'pt-BR',
        },
      })
      .then(({ status, data }) => {
        if (status === 200) {
          setMovieDetails(data);
        }
      });
  }, [id]);

  return (
    <>
      <Header hasFilter={false} />
      <Container image={movieDetails.backdrop_path}>
        <Main>
          <Section>
            <Content>
              <img src="" alt="" />
            </Content>
          </Section>
          <Section>
            <Content>
              <h2>Raya and the last dragon</h2>
            </Content>
          </Section>
        </Main>
      </Container>
    </>
  );
};

export default MovieDetails;
