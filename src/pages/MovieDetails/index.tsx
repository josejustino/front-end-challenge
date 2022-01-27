import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { parseISO, format, intervalToDuration, subMinutes } from 'date-fns';
import { FaFilm } from 'react-icons/fa';
import Rating from 'react-rating';
import { FaRegStar, FaStar } from 'react-icons/fa';

import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { MovieImage, movieImageSrc } from '../../components/MovieImage';

import api from '../../services/api';

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
  vote_average: number;
}

export const MovieDetails: React.FC<MovieDetailsProps> = () => {
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

    api
      .get<MovieDetailsProps>(`movie/${id}`)
      .then(({ status, data }) => {
        if (status === 200) {
          setMovieDetails({
            ...data,
            release_year: format(parseISO(data?.release_date), 'yyyy'),
            release_date: format(parseISO(data?.release_date), 'dd/MM/yyyy'),
            duration: movieDurationFormatted(data?.runtime),
            genresNamesList: data?.genres.map(genre => genre?.name).join(', '),
            country: data?.production_countries[0]?.iso_3166_1,
          });
          setLoading(false);
        }
      })
      .catch(error => {
        setLoading(false);
        throw new Error(error.message);
      });
  }, [id, movieDurationFormatted]);

  const setRating = useMemo(() => {
    if (!Number.isNaN(movieDetails?.vote_average)) {
      const result = (movieDetails?.vote_average * 5) / 10;

      if (result < 0) return 0;

      return result;
    }

    return 0;
  }, [movieDetails?.vote_average]);

  return (
    <>
      <Loading loading={loading} iconSize="30" />

      <Header
        breadcrumbIcon={FaFilm}
        breadcrumb={[
          { title: 'Filmes populares', url: '/' },
          { title: movieDetails?.title ?? '... Carregando' },
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
              <ContentBackground
                image={movieImageSrc(
                  movieDetails.backdrop_path,
                  'w1920_and_h800_multi_faces',
                  movieDetails?.poster_path,
                )}
              >
                <ContainerInfo>
                  <ContainerSections>
                    <ImageSection>
                      <MovieImage
                        name={movieDetails?.title}
                        path={movieDetails?.poster_path}
                        pathFallback={movieDetails.backdrop_path}
                        size="w400"
                      />
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
                        <span className="user-score__title">Avaliação:</span>
                        <Rating
                          start={0}
                          stop={5}
                          fractions={2}
                          readonly
                          initialRating={setRating}
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
