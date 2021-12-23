import React, { useCallback, useEffect, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { parseISO, format } from 'date-fns';
import { css } from '@emotion/react';
import { PacmanLoader } from 'react-spinners';
import { FaFilm } from 'react-icons/fa';

import api from '../../services/api';

import { API_KEY } from '../../config/index';

import { Header } from '../../components/Header';
import PopularMovieList from '../../components/PopularMovieList';

import { Container, Main, Content, Section, Loading } from './styles';

interface PopularMovieProps {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
}

interface PopularMovieResponse {
  results: Array<PopularMovieProps>;
  total_pages: number;
  total_results: number;
}

const override = css`
  display: block;
  margin: 1rem auto;
`;

const PopularMovies: React.FC<PopularMovieProps> = () => {
  const [popularMovies, setPopularMovies] = useState<PopularMovieProps[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [pageSize] = useState(10);
  const [pageNumber, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleMovies = useCallback(({ page }) => {
    setLoading(true);

    api
      .get<PopularMovieResponse>(`discover/movie`, {
        params: {
          api_key: API_KEY,
          language: 'pt-BR',
          page,
          sort_by: 'popularity.desc',
        },
      })
      .then(response => {
        const { status, data } = response;

        const popularMoviesFormatted = data?.results?.map(popularMovie => {
          return {
            ...popularMovie,
            release_date: popularMovie.release_date
              ? format(parseISO(popularMovie.release_date), 'MMM dd, yyyy')
              : '',
          };
        });

        if (status === 200) {
          setTotalResults(data?.total_results);
          setPopularMovies(prevMovies =>
            prevMovies.concat(popularMoviesFormatted),
          );
          setLoading(false);
        }
      })
      .catch(error => {
        throw new Error(error.message);
      });
  }, []);

  const handlePageChange = useCallback(() => {
    handleMovies({ page: pageNumber + 1 });

    setPage(prevPage => prevPage + 1);
  }, [handleMovies, pageNumber]);

  const [paginateRef] = useInfiniteScroll({
    loading,
    hasNextPage: pageNumber * pageSize < totalResults,
    onLoadMore: handlePageChange,
  });

  useEffect(() => {
    handleMovies({ page: 1 });
  }, [handleMovies]);

  return (
    <>
      <Header
        breadcrumb={[{ title: 'Filmes populares', url: '' }]}
        breadcrumbIcon={FaFilm}
      />
      <Container>
        <Main>
          <Content id="scrollableDiv">
            <Section>
              <PopularMovieList
                popularMovies={popularMovies}
                loading={loading}
              />
            </Section>
            {pageNumber * pageSize < totalResults && (
              <div className="loading__more" ref={paginateRef}>
                <Loading>
                  <PacmanLoader
                    loading={loading}
                    size={15}
                    color="#FFFFFF"
                    css={override}
                  />
                </Loading>
              </div>
            )}
          </Content>
        </Main>
      </Container>
    </>
  );
};

export default PopularMovies;
