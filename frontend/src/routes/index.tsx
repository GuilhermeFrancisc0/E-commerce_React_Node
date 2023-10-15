import React from 'react';
import { Navigate, Route, Routes as SwitchRoutes } from 'react-router-dom';

import { useAppSelector } from '../hooks';
import { ROUTES } from './routes';

const Routes: React.FC = () => {
    const { user } = useAppSelector(state => state.auth);

    const routes = React.useMemo(() => {
        return ROUTES.filter(r => !r.permissions || r.permissions.some(p => user.permissions.includes(p)));
    }, [user]);

    return (
        <SwitchRoutes>
            {routes.map(({ path, component }) => (
                <Route key={path} path={path} element={component} />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
        </SwitchRoutes>
    )
};

export default Routes;
