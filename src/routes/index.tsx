import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PopularMovies from '../pages/PopularMovies';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={PopularMovies} />
  </Switch>
);

export default Routes;
