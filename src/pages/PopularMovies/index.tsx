import React, { useEffect, useRef, useState } from 'react';
import { parseISO, format } from 'date-fns';

import api from '../../services/api';

import { API_KEY } from '../../config/index';

import Header from '../../components/Header';
import PopularMovieList from '../../components/PopularMovieList';
import FiltroModal from '../../components/ModalFilter';

import { useInfinityScroll } from '../../hooks/useInfinityScroll';

import { Container, Main, Content, Section } from './styles';

interface PopularMovieProps {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  releaseDateFormatted: string;
}

interface PopularMovieResponse {
  results: Array<PopularMovieProps>;
}

const PopularMovies: React.FC<PopularMovieProps> = () => {
  const [popularMovies, setPopularMovies] = useState<PopularMovieProps[]>([]);
  // const [isLoading, setIsLoading] = useState(false);

  const scrollObserve = useRef() as React.MutableRefObject<HTMLDivElement>;
  const page = useInfinityScroll({ scrollObserve });

  useEffect(() => {
    // setIsLoading(true);

    api
      .get<PopularMovieResponse>(`discover/movie`, {
        params: {
          api_key: API_KEY,
          language: 'pt-BR',
          page,
          sort_by: 'popularity.desc',
        },
      })
      .then(({ data, status }) => {
        const { results } = data;

        const popularMoviesFormatted = results.map(popularMovie => {
          return {
            ...popularMovie,
            releaseDateFormatted: format(
              parseISO(popularMovie.release_date),
              'MMM dd, yyyy',
            ),
          };
        });

        if (status === 200) {
          setPopularMovies(prevMovies => [
            ...prevMovies,
            ...popularMoviesFormatted,
          ]);

          // setIsLoading(false);
        }
      })
      .catch(error => {
        throw new Error(error.message);
      });
  }, [page]);

  return (
    <>
      <Header />
      <Container>
        <Main>
          <Content>
            <Section>
              <PopularMovieList popularMovies={popularMovies} />
            </Section>
            <div ref={scrollObserve} />
          </Content>
        </Main>
      </Container>
      <FiltroModal />
    </>
  );
};

export default PopularMovies;
