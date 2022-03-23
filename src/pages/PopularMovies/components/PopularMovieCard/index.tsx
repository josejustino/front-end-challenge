import React from 'react';
import { Link } from 'react-router-dom';

import { MovieCard } from './styles';

interface MovieProps {
  movie: {
    id: number;
    poster_path: string;
    title: string;
    release_date: string;
  };
}

export const PopularMovieCard: React.FC<MovieProps> = ({ movie }) => {
  return (
    <MovieCard data-testid="movie-card">
      <div className="card-image">
        <Link to={`/movie-details/${movie.id}`}>
          <img
            src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}
            alt={movie.title}
          />
        </Link>
      </div>
      <div className="card-footer">
        <h3>
          <Link to={`/movie-details/${movie.id}`}>{movie.title}</Link>
        </h3>
        <p>{movie.release_date}</p>
      </div>
    </MovieCard>
  );
};

export default PopularMovieCard;
