import { BrowserRouter as Router } from 'react-router-dom';

import 'antd/dist/antd.css';
import GlobalStyle from './styles/global';

import Routes from './routes';

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <Routes />
      <GlobalStyle />
    </Router>
  );
};

export default App;
