import { screen, render, waitFor } from '@testing-library/react';

import { PopularMovies } from '../../../pages/PopularMovies';

const renderPopularMovies = () => {
  render(<PopularMovies />);
};

describe('PopularMovies', () => {
  it('should render PopularMovies', () => {
    renderPopularMovies();

    expect(screen.getByTestId('popular-movies')).toBeInTheDocument();
  });

  fit('should render PopularMovies component with 10 movies', async () => {
    renderPopularMovies();

    await waitFor(() => {
      expect(screen.getAllByTestId('popular-movies-list-card')).toHaveLength(
        10,
      );
    });
  });
});
