import React from 'react';
import { Link } from 'react-router-dom';

import { Container, CardsList, Card } from './styles';

interface MovieProps {
  id: number;
  poster_path: string;
  title: string;
  releaseDateFormatted: string;
}

interface PopularMovieProps {
  popularMovies: Array<MovieProps>;
}

const PopularMovieList: React.FC<PopularMovieProps> = ({ popularMovies }) => {
  return (
    <Container>
      <h1>Popular Movies</h1>
      <CardsList>
        {popularMovies.map(popularMovie => {
          return (
            <Card key={popularMovie.id}>
              <div className="card-image">
                <Link to={`/movie-details/${popularMovie.id}`}>
                  <img
                    src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${popularMovie.poster_path}`}
                    alt={popularMovie.title}
                  />
                </Link>
              </div>
              <div className="card-footer">
                <h3>
                  <Link to={`/movie-details/${popularMovie.id}`}>
                    {popularMovie.title}
                  </Link>
                </h3>
                <p>{popularMovie.releaseDateFormatted}</p>
              </div>
            </Card>
          );
        })}
      </CardsList>
    </Container>
  );
};

export default PopularMovieList;
