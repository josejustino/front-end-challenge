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

const PopularMovieList: React.FC<PopularMovieProps> = ({ popularMovies }) => {
  return (
    <Container>
      {popularMovies.map(popularMovie => {
        return (
          <Card key={popularMovie.id}>
            <div className="card-image">
              <img
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${popularMovie.poster_path}`}
                alt={popularMovie.title}
              />
            </div>
            <div className="card-footer">
              <h3>Raya e o último dragão</h3>
              <span>03 de mar de 2021</span>
            </div>
          </Card>
        );
      })}
    </Container>
  );
};

export default PopularMovieList;
