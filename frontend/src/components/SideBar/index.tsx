import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { grey } from '@mui/material/colors';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { IRoutes } from '../../routes/routes';
import { TOPBAR_HEIGHT } from '../TopBar';

type Props = {
  routes: IRoutes[];
  collapse: boolean;
};

const SIDEBAR_WIDTH = 180;
const SIDEBAR_COLLAPSED_WIDTH = TOPBAR_HEIGHT;

const SideBar: React.FC<Props> = ({ routes, collapse }) => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  return (
    <Tabs
      sx={{
        bgcolor: theme => theme.palette.secondary.main,
        width: collapse ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH,
        transition: 'width 0.2s ease-in-out',
        height: '100%',
      }}
      orientation="vertical"
      TabIndicatorProps={{ sx: { width: '3px' } }}
      textColor="primary"
      indicatorColor="primary"
      value={pathname}
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
              color: grey[500]
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