import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';

import Routes from './routes';
import { ModalProvider } from './contexts/ModalContext';

const App: React.FC = () => (
  <Router>
    <ModalProvider>
      <Routes />
    </ModalProvider>
    <GlobalStyle />
  </Router>
);

export default App;
