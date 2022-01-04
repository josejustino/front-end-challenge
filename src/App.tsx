import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import 'antd/dist/antd.css';
import GlobalStyle from './styles/global';

import Routes from './routes';
import { ModalProvider } from './hooks/useModal';

const App: React.FC = () => (
  <Router>
    <ModalProvider>
      <Routes />
    </ModalProvider>
    <GlobalStyle />
  </Router>
);

export default App;
