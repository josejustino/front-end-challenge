import React from 'react';

import { Container, Card } from './styles';

interface MovieProps {
  id: number;
  poster_path: string;
  title: string;
}

interface PopularMovieProps {
  popularMovies: Array<MovieProps>;
}

const DataList: React.FC<PopularMovieProps> = ({ popularMovies }) => {
  return (
    <Container>
      {popularMovies.map(popularMovie => {
        return (
          <Card key={popularMovie.id}>
            <div>
              <img
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${popularMovie.poster_path}`}
                alt={popularMovie.title}
              />
            </div>
          </Card>
        );
      })}
    </Container>
  );
};

export default DataList;
