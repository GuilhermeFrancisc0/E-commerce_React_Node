import React from 'react';

import { ThemeProvider } from '@mui/material';

import NavigationBars from './components/NavigationBars';
import Routes from './routes';
import { theme } from './styles/theme';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <NavigationBars>
      <Routes />
    </NavigationBars>
  </ThemeProvider>
);

export default App;
