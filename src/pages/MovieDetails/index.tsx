import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { parseISO, format, intervalToDuration, subMinutes } from 'date-fns';
import { FaFilm } from 'react-icons/fa';
import Rating from 'react-rating';
import { FaRegStar, FaStar } from 'react-icons/fa';

import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';

import api from '../../services/api';

import { API_KEY } from '../../config';

import {
  Container,
  Main,
  Content,
  ContentBackground,
  ContainerInfo,
  ContainerSections,
  ImageSection,
  ContentSection,
} from './styles';

interface ParamsProps {
  id: string;
}

interface MovieDetailsProps {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  release_year: string;
  runtime: number;
  duration: string;
  genres: Array<{ id: number; name: string }>;
  genresNamesList: string;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  country: string;
  backdrop_path: string;
  poster_path: string;
}

const MovieDetails: React.FC<MovieDetailsProps> = () => {
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetailsProps>(
    {} as MovieDetailsProps,
  );

  const { id } = useParams<ParamsProps>();
  const history = useHistory();

  const movieDurationFormatted = useCallback((runtime: number) => {
    const duration = intervalToDuration({
      start: subMinutes(Date.now(), runtime),
      end: Date.now(),
    });

    if (duration.hours === 0) {
      return `${duration.minutes}m`;
    }

    if (duration.minutes === 0) {
      return `${duration.hours}h`;
    }

    return `${duration.hours}h ${duration.minutes}m`;
  }, []);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      api
        .get<MovieDetailsProps>(`movie/${id}`, {
          params: {
            api_key: API_KEY,
            language: 'pt-BR',
          },
        })
        .then(({ status, data }) => {
          if (status === 200) {
            setMovieDetails({
              ...data,
              release_year: format(parseISO(data?.release_date), 'yyyy'),
              release_date: format(parseISO(data?.release_date), 'dd/MM/yyyy'),
              duration: movieDurationFormatted(data?.runtime),
              genresNamesList: data?.genres
                .map(genre => genre?.name)
                .join(', '),
              country: data?.production_countries[0]?.iso_3166_1,
            });
            setLoading(false);
          }
        })
        .catch(error => {
          setLoading(false);
          throw new Error(error.message);
        });
    }, 500);
  }, [id, movieDurationFormatted]);

  const setMovieImage = useMemo(() => {
    if (!movieDetails?.poster_path) return '';

    return `https://www.themoviedb.org/t/p/w400${movieDetails?.poster_path}`;
  }, [movieDetails?.poster_path]);

  return (
    <>
      <Loading loading={loading} iconSize="30" />

      <Header
        breadcrumbIcon={FaFilm}
        breadcrumb={[
          { title: 'Filmes populares', url: '/' },
          { title: movieDetails?.title },
        ]}
        buttons={[
          {
            content: 'Voltar',
            marginLess: true,
            onClick: () => history.push('/'),
          },
        ]}
      />

      {!loading && (
        <Container>
          <Main>
            <Content>
              <ContentBackground image={movieDetails.backdrop_path}>
                <ContainerInfo>
                  <ContainerSections>
                    <ImageSection>
                      <img src={setMovieImage} alt={movieDetails?.title} />
                    </ImageSection>

                    <ContentSection>
                      <h2>
                        {movieDetails?.title} ({movieDetails?.release_year})
                      </h2>
                      <p className="quick-info">
                        <span>
                          {movieDetails?.release_date}
                          {'  '}
                          {movieDetails?.country
                            ? `(${movieDetails?.country})`
                            : ''}
                        </span>
                        <span className="genres">
                          {movieDetails?.genresNamesList}
                        </span>
                        <span className="duration">
                          {movieDetails?.duration ?? 'ND'}
                        </span>
                      </p>
                      <div className="user-score">
                        <span className="user-score__title">
                          Classificação do usuário:
                        </span>
                        <Rating
                          start={0}
                          stop={5}
                          fractions={1}
                          readonly
                          initialRating={3.4}
                          fullSymbol={<FaStar />}
                          emptySymbol={<FaRegStar />}
                        />
                      </div>
                      <h3>Resumo</h3>
                      <p className="abstract">{movieDetails?.overview}</p>
                    </ContentSection>
                  </ContainerSections>
                </ContainerInfo>
              </ContentBackground>
            </Content>
          </Main>
        </Container>
      )}
    </>
  );
};

export default MovieDetails;
