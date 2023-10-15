import React from 'react';

import { Box, Grid } from '@mui/material';

import { useDisclose } from '../../hooks/util';
import SideBar from './SideBar';
import TopBar, { TOPBAR_HEIGHT } from './TopBar';

type Props = {
    children: React.ReactNode;
}

const NavigationBars: React.FC<Props> = ({ children }) => {
    const sideBar = useDisclose();

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <TopBar toggleSidebar={sideBar.onToggle} />
            <Grid container sx={{ minHeight: `calc(100vh - ${TOPBAR_HEIGHT}px)` }}>
                <Grid item>
                    <SideBar collapse={sideBar.isOpen} />
                </Grid>
                <Grid item sx={{ p: 2, flexGrow: 1 }}>
                    {children}
                </Grid>
            </Grid>
        </Box>
    )
};

export default NavigationBars;
