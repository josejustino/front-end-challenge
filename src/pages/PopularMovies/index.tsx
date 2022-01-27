import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { parseISO, format } from 'date-fns';
import { css } from '@emotion/react';
import { PacmanLoader } from 'react-spinners';
import { FaFilm } from 'react-icons/fa';

import api from '../../services/api';

import { Header } from '../../components/Header';
import { PopularMovieList } from './components/PopularMovieList';
import { Button } from '../../components/Button';
import { Genres } from './components/Filters/Genres';

import {
  Container,
  Main,
  Content,
  Section,
  Loading,
  FilterFormContainer,
  FilterFormContent,
  ButtonsFilter,
} from './styles';

interface PopularMovieProps {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
}

interface PopularMovieResponseProps {
  results: Array<PopularMovieProps>;
  total_pages: number;
  total_results: number;
}

interface HeaderProps {
  closeFilter: () => void;
}

interface FormProps {
  genres: Array<string>;
}

const override = css`
  display: block;
  margin: 1rem auto;
`;

export const PopularMovies: React.FC = () => {
  const headerRef = useRef<HeaderProps>(null);

  const [loading, setLoading] = useState(false);

  const [popularMovies, setPopularMovies] = useState<PopularMovieProps[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [pageSize] = useState(10);
  const [pageNumber, setPage] = useState(1);
  const [filters, setFilters] = useState({
    genres: '',
  });

  const { control, handleSubmit, setValue } = useForm<FormProps>({
    defaultValues: {
      genres: [],
    },
  });

  const handleMovies = useCallback(
    ({ page }) => {
      setLoading(true);

      api
        .get<PopularMovieResponseProps>(`discover/movie`, {
          params: {
            page,
            with_genres: filters?.genres,
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
    },
    [filters],
  );

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

  const handleClearFilters = useCallback(() => {
    setValue('genres', []);

    headerRef?.current?.closeFilter();
  }, [setValue]);

  const onSubmit = async (data: FormProps) => {
    const formatGenres = data?.genres?.join(',');

    setPopularMovies([]);
    setFilters({ ...filters, genres: formatGenres });
  };

  return (
    <Container data-testid="popular-movies">
      <Header
        ref={headerRef}
        breadcrumb={[{ title: 'Filmes populares' }]}
        breadcrumbIcon={FaFilm}
        drawerProps={{ height: 'auto' }}
      >
        <FilterFormContainer onSubmit={handleSubmit(onSubmit)}>
          <FilterFormContent />
          <Genres control={control} />
          <FilterFormContent />
          <ButtonsFilter>
            <Button
              content="Limpar Filtros"
              marginLess
              type="submit"
              onClick={handleClearFilters}
            />
            <Button
              content="Cancelar"
              onClick={e => {
                e.preventDefault();
                headerRef.current?.closeFilter();
              }}
            />
            <Button
              content="Aplicar"
              marginLess
              type="submit"
              color="#4953b8"
              onClick={headerRef.current?.closeFilter}
            />
          </ButtonsFilter>
        </FilterFormContainer>
      </Header>

      <Main>
        <Content id="scrollableDiv">
          <Section>
            <PopularMovieList popularMovies={popularMovies} loading={loading} />
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
  );
};
