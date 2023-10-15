import './styles/toast.scss';

import React from 'react';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from '@mui/material';

import NavigationBars from './components/NavigationBars';
import Routes from './routes';
import { theme } from './styles/theme';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <NavigationBars>
      <Routes />
    </NavigationBars>
    <ToastContainer position="bottom-right" />
  </ThemeProvider>
);

export default App;
