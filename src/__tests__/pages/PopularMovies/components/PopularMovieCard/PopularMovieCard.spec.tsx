import { render, screen } from '@testing-library/react';

import { PopularMovieCard } from '../../../../../pages/PopularMovies/components/PopularMovieCard';

const movie = {
  id: 1,
  poster_path: 'matrix-picture',
  title: 'Matrix',
  release_date: '21/05/1999',
};

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

const renderPopularMovieCard = () => {
  render(<PopularMovieCard movie={movie} />);
};

describe('PopularMovieCard', () => {
  it('should render PopularMovieCard', () => {
    renderPopularMovieCard();

    expect(screen.getByTestId('movie-card')).toBeInTheDocument();
  });

  it('should display properties content', () => {
    renderPopularMovieCard();
    const imageUrlPath = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`;

    expect(screen.getByText(new RegExp(movie.title, 'i'))).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(movie.release_date, 'i')),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(new RegExp(movie.title, 'i')),
    ).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', imageUrlPath);
  });
});
