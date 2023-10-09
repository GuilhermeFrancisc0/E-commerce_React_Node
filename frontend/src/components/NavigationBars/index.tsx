import React from 'react';

import { Box, Grid } from '@mui/material';

import SideBar from './SideBar';
import TopBar, { TOPBAR_HEIGHT } from './TopBar';

type Props = {
    children: React.ReactNode;
}

const NavigationBars: React.FC<Props> = ({ children }) => {

    const [collapseSidebar, setCollapseSideBar] = React.useState(false);

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <TopBar collapseSidebar={collapseSidebar} setCollapseSideBar={setCollapseSideBar} />
            <Grid container sx={{ minHeight: `calc(100vh - ${TOPBAR_HEIGHT}px)` }}>
                <Grid item>
                    <SideBar collapse={collapseSidebar} />
                </Grid>
                <Grid item sx={{ p: 2, flexGrow: 1 }}>
                    {children}
                </Grid>
            </Grid>
        </Box>
    )
};

export default NavigationBars;
