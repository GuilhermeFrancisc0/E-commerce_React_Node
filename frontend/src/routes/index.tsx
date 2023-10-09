import React from 'react';
import { Route, Routes as SwitchRoutes } from 'react-router-dom';

import { routes } from './routes';

const Routes: React.FC = () => (
    <SwitchRoutes>
        {routes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
        ))}
    </SwitchRoutes>
);

export default Routes;
