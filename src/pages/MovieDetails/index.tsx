import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { parseISO, format, intervalToDuration, subMinutes } from 'date-fns';

import Header from '../../components/Header';

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

interface ParamProps {
  id: string;
}

interface MovieDetailsProps {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  releaseDateFormatted: string;
  releaseYear: string;
  runtime: number;
  duration: {
    hours?: number;
    minutes?: number;
  };
  genres: Array<{ id: number; name: string }>;
  genresNamesList: string;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  country: string;
  backdrop_path: string;
  poster_path: string;
}

// interface MovieCreditsProps {
//   crew: Array<MovieDetailsResponse>;
// }

const MovieDetails: React.FC<MovieDetailsProps> = () => {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsProps>(
    {} as MovieDetailsProps,
  );
  // const [movieCredits, setMovieCredits] = useState<MovieCreditsProps>(
  //   {} as MovieCreditsProps,
  // );

  const { id } = useParams<ParamProps>();

  console.log(movieDetails);

  useEffect(() => {
    api
      .get<MovieDetailsProps>(`movie/${id}`, {
        params: {
          api_key: API_KEY,
          language: 'pt-BR',
        },
      })
      .then(({ status, data }) => {
        if (status === 200) {
          const movieDetailsFormatted = {
            ...data,
            releaseYear: format(parseISO(data.release_date), 'yyyy'),
            releaseDateFormatted: format(
              parseISO(data.release_date),
              'dd/MM/yyyy',
            ),
            duration: intervalToDuration({
              start: subMinutes(Date.now(), data.runtime),
              end: Date.now(),
            }),
            genresNamesList: data.genres.map(genre => genre.name).join(', '),
            country: data.production_countries[0]?.iso_3166_1,
          };
          setMovieDetails(movieDetailsFormatted);
        }
      });
  }, [id]);

  // useEffect(() => {
  //   api
  //     .get(`movie/${id}/credits`, {
  //       params: {
  //         api_key: API_KEY,
  //         language: 'pt-BR',
  //       },
  //     })
  //     .then(({ status, data }) => {
  //       if (status === 200) {
  //         setMovieCredits(data);
  //       }
  //     });
  // }, [id]);

  return (
    <>
      <Header hasFilter={false} />
      <Container>
        <Main>
          <Content>
            <ContentBackground image={movieDetails.backdrop_path}>
              <ContainerInfo>
                <ContainerSections>
                  <ImageSection>
                    <img
                      src={`https://www.themoviedb.org/t/p/w400${movieDetails?.poster_path}`}
                      alt=""
                    />
                  </ImageSection>

                  <ContentSection>
                    <h2>
                      {movieDetails.title} ({movieDetails?.releaseYear})
                    </h2>
                    <p className="quick-info">
                      <span>
                        {movieDetails.releaseDateFormatted}
                        {'  '}
                        {`(${movieDetails?.country})`}
                      </span>
                      <span className="genres">
                        {movieDetails.genresNamesList}
                      </span>
                      <span className="duration">
                        {`${movieDetails.duration?.hours}h
                        ${movieDetails.duration?.minutes}m`}
                      </span>
                    </p>
                    <div className="user-score">
                      <span>User Score</span>
                    </div>
                    <h3>Overview</h3>
                    <p className="abstract">{movieDetails.overview}</p>
                    {/* <div className="authors">
                      <ol>
                        <li>
                          <p>
                            <strong>Kiel Murray</strong>
                          </p>
                          <p>Story</p>
                        </li>
                        <li>
                          <p>
                            <strong>Kiel Murray</strong>
                          </p>
                          <p>Story</p>
                        </li>
                        <li>
                          <p>
                            <strong>Kiel Murray</strong>
                          </p>
                          <p>Story</p>
                        </li>
                      </ol>

                      <ol>
                        <li>
                          <p>
                            <strong>Kiel Murray</strong>
                          </p>
                          <p>Story</p>
                        </li>
                        <li>
                          <p>
                            <strong>Kiel Murray</strong>
                          </p>
                          <p>Story</p>
                        </li>
                        <li>
                          <p>
                            <strong>Kiel Murray</strong>
                          </p>
                          <p>Story</p>
                        </li>
                      </ol>

                      <ol>
                        <li>
                          <p>
                            <strong>Kiel Murray</strong>
                          </p>
                          <p>Story</p>
                        </li>
                        <li>
                          <p>
                            <strong>Kiel Murray</strong>
                          </p>
                          <p>Story</p>
                        </li>
                        <li>
                          <p>
                            <strong>Kiel Murray</strong>
                          </p>
                          <p>Story</p>
                        </li>
                      </ol>
                    </div> */}
                  </ContentSection>
                </ContainerSections>
              </ContainerInfo>
            </ContentBackground>
          </Content>
        </Main>
      </Container>
    </>
  );
};

export default MovieDetails;
