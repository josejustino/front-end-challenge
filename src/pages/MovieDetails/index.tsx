import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../components/Header';

import api from '../../services/api';

import { API_KEY } from '../../config';

import {
  Container,
  Main,
  Content,
  ContentBackground,
  ContainerSections,
  ImageSection,
  ContentSection,
} from './styles';

interface ParamProps {
  id: string;
}

interface MovieDatailsProps {
  id: number;
  backdrop_path: string;
  poster_path: string;
}

const MovieDetails: React.FC<MovieDatailsProps> = () => {
  const [movieDetails, setMovieDetails] = useState<MovieDatailsProps>(
    {} as MovieDatailsProps,
  );

  const { id } = useParams<ParamProps>();

  console.log(movieDetails);

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
      <Container>
        <Main>
          <Content>
            <ContentBackground image={movieDetails.backdrop_path}>
              <ContainerSections>
                <ImageSection>
                  <img
                    src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movieDetails.poster_path}`}
                    alt=""
                  />
                </ImageSection>

                <ContentSection>
                  <h2>Raya and the last dragon (2021)</h2>
                  <p className="quick-info">
                    <span>03/05/2021 (US)</span>
                    <span>Animação, Aventura, Fantasia, Família, Ação</span>
                    <span>1h 47m</span>
                  </p>
                  <div className="user-score">
                    <span>User Score</span>
                  </div>
                  <p>A quest to save her world.</p>
                  <h3>Overview</h3>
                  <p>
                    O reino encantado Kumandra é dividido em cinco regiões e sua
                    população venerava os dragões mágicos que eram presentes no
                    reino, porém quando uma força maligna ameaçou a Terra, os
                    dragões se sacrificaram para salvar a humanidade. Agora, 500
                    anos depois, o mesmo mal voltou e cabe a uma guerreira
                    solitária, Raya, rastrear o lendário último dragão para
                    restaurar a terra fraturada e seu povo dividido.
                  </p>
                  <div className="authors">
                    <ol>
                      <li>
                        <p>Kiel Murray</p>
                        <p>Story</p>
                      </li>
                      <li>
                        <p>Kiel Murray</p>
                        <p>Story</p>
                      </li>
                      <li>
                        <p>Kiel Murray</p>
                        <p>Story</p>
                      </li>
                    </ol>

                    <ol>
                      <li>
                        <p>Kiel Murray</p>
                        <p>Story</p>
                      </li>
                      <li>
                        <p>Kiel Murray</p>
                        <p>Story</p>
                      </li>
                      <li>
                        <p>Kiel Murray</p>
                        <p>Story</p>
                      </li>
                    </ol>

                    <ol>
                      <li>
                        <p>Kiel Murray</p>
                        <p>Story</p>
                      </li>
                      <li>
                        <p>Kiel Murray</p>
                        <p>Story</p>
                      </li>
                      <li>
                        <p>Kiel Murray</p>
                        <p>Story</p>
                      </li>
                    </ol>
                  </div>
                </ContentSection>
              </ContainerSections>
            </ContentBackground>
          </Content>
        </Main>
      </Container>
    </>
  );
};

export default MovieDetails;
