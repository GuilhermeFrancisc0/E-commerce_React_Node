import React from 'react';

import { Box, ThemeProvider } from '@mui/material';

import TopBar from './components/TopBar';
import Routes from './routes';
import { theme } from './styles/theme';

const App: React.FC = () => {
  const [collapseSidebar, setCollapseSideBar] = React.useState(false);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <ThemeProvider theme={theme}>
        <TopBar collapseSidebar={collapseSidebar} setCollapseSideBar={setCollapseSideBar} />
        <Routes collapseSidebar={collapseSidebar} />
      </ThemeProvider>
    </Box>
  );
};

export default App;
