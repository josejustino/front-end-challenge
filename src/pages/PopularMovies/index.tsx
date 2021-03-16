import React, { useEffect, useRef, useState } from 'react';
import { parseISO, format } from 'date-fns';
// import enUS from 'date-fns/locale/en-US';

import api from '../../services/api';

import { API_KEY } from '../../config/index';

import Header from '../../components/Header';
import PopularMovieList from '../../components/PopularMovieList';
import FiltroModal from '../../components/ModalFilter';

import { useInfinityScroll } from '../../hooks/useInfinityScroll';

import { Container, Main, Content, Section } from './styles';

interface PopularMovie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  releaseDateFormatted: string;
}

interface IPopularMovieResponse {
  results: Array<PopularMovie>;
}

const PopularMovies: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<PopularMovie[]>([]);
  // const [isLoading, setIsLoading] = useState(false);

  const scrollObserve = useRef<HTMLDivElement>(null);
  const page = useInfinityScroll(scrollObserve);

  console.log(popularMovies);

  useEffect(() => {
    // setIsLoading(true);

    api
      .get<IPopularMovieResponse>(`movie/popular`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          page,
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
      .catch(error => console.error(error));
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
