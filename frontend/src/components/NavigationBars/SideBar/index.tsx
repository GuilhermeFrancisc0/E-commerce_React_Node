import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { useAppSelector } from '../../../hooks';
import { ROUTES } from '../../../routes/routes';
import { getUserByToken } from '../../../util/helpers/auth';
import { TOPBAR_HEIGHT } from '../TopBar';

type Props = {
  collapse: boolean;
};

const SIDEBAR_WIDTH = 180;
const SIDEBAR_COLLAPSED_WIDTH = TOPBAR_HEIGHT;

const SideBar: React.FC<Props> = ({ collapse }) => {
  const { accessToken } = useAppSelector(state => state.auth);

  const user = React.useMemo(getUserByToken, [accessToken]);

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const routes = React.useMemo(() => {
    return ROUTES.filter(r => !r.permissions || r.permissions.some(p => user?.permissions?.includes(p)));
  }, [user]);

  return (
    <Tabs
      sx={{
        bgcolor: theme => theme.palette.secondary.main,
        boxShadow: theme => theme.shadows[4],
        width: collapse ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH,
        transition: 'width 0.2s ease-in-out',
        height: '100%',
      }}
      orientation="vertical"
      TabIndicatorProps={{ sx: { width: '3px' } }}
      indicatorColor="primary"
      value={routes.find(r => r.path === pathname)?.path || '/'}
      onChange={(_, v: string) => navigate(v, { replace: true })}
    >
      {routes
        .map(route => (
          <Tab
            key={route.path}
            sx={{
              displax: 'flex',
              justifyContent: 'left',
              minHeight: SIDEBAR_COLLAPSED_WIDTH,
              minWidth: 0,
            }}
            label={collapse ? route.label : ''}
            value={route.path}
            icon={route.tabIcon}
            iconPosition="start"
          />
        ))}
    </Tabs>
  );
};
export default SideBar;