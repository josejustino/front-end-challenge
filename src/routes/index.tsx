import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PopularMovies from '../pages/PopularMovies';
import MovieDetails from '../pages/MovieDetails';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={PopularMovies} />
    <Route path="/movie-details/:id" exact component={MovieDetails} />
  </Switch>
);

export default Routes;
