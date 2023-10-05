import React from 'react';
import { BrowserRouter, Route, Routes as SwitchRoutes } from 'react-router-dom';

import { Grid } from '@mui/material';

import SideBar from '../components/SideBar';
import { TOPBAR_HEIGHT } from '../components/TopBar';
import { routes } from './routes';

type Props = {
    collapseSidebar: boolean;
}

const Routes: React.FC<Props> = ({ collapseSidebar }) => (
    <BrowserRouter>
        <Grid container sx={{ minHeight: `calc(100vh - ${TOPBAR_HEIGHT}px)` }}>
            <Grid item>
                <SideBar routes={routes} collapse={collapseSidebar} />
            </Grid>
            <Grid item sx={{ p: 2, flexGrow: 1 }}>
                <SwitchRoutes>
                    {routes.map(({ path, component }) => (
                        <Route key={path} path={path} element={component} />
                    ))}
                </SwitchRoutes>
            </Grid>
        </Grid>
    </BrowserRouter>
);

export default Routes;
