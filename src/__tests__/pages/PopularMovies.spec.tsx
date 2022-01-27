import { screen, render, waitFor } from '@testing-library/react';

import { PopularMovies } from '../../pages/PopularMovies';

import { makeServer } from '../../../miragejs/server';

const renderPopularMovies = () => {
  render(<PopularMovies />);
};

describe('PopularMovies', () => {
  let server: any;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should render PopularMovies', () => {
    renderPopularMovies();

    expect(screen.getByTestId('popular-movies')).toBeInTheDocument();
  });

  fit('should render PopularMovies component with 10 movies', async () => {
    server.createList('movie', 10);

    renderPopularMovies();

    await waitFor(() => {
      expect(screen.getAllByTestId('popular-movies-list-card')).toHaveLength(
        10,
      );
    });
  });
});
