import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';

import { Container, Main, Section, Content } from './styles';

const MovieDetails: React.FC = () => {
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    console.log(movieDetails);
  }, []);

  return (
    <>
      <Header hasFilter={false} />
      <Container>
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
