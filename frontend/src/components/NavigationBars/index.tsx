import React from 'react';

import { Box } from '@mui/material';

import { useDisclose } from '../../hooks/util';
import SideBar from './SideBar';
import TopBar, { TOPBAR_HEIGHT } from './TopBar';

type Props = {
  children: React.ReactNode;
}

const NavigationBars: React.FC<Props> = ({ children }) => {
  const sideBar = useDisclose();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#e7e7e7' }}>
      <TopBar toggleSidebar={sideBar.onToggle} />
      <Box display='flex' sx={{ minHeight: `calc(100vh - ${TOPBAR_HEIGHT}px)` }}>
        <Box>
          <SideBar collapse={sideBar.isOpen} />
        </Box>

        <Box padding={2} width='100%'>
          {children}
        </Box>
      </Box>
    </Box>
  )
};

export default NavigationBars;
