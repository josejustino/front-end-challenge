import { render, screen } from '@testing-library/react';

import { PopularMovieCard } from '../../../../../pages/PopularMovies/components/PopularMovieCard';

const movie = {
  id: 1,
  poster_path:
    'https://media.istockphoto.com/photos/matrix-picture-id629391430',
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
});
