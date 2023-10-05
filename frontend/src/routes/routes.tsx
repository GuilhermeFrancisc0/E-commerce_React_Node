import { ReactElement } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';

import Home from '../pages/Home';
import Products from '../pages/Products';

export interface IRoutes {
  component: ReactElement;
  path: string;
  label: string;
  tabIcon: ReactElement;
  permission?: ('administrator' | 'client')[];
}

export const routes: IRoutes[] = [
  {
    component: <Home />,
    path: '/',
    label: 'Início',
    tabIcon: <HomeIcon />,
  },
  {
    component: <Products />,
    path: '/products',
    label: 'Produtos',
    tabIcon: <StorefrontIcon />,
    permission: ['administrator', 'client']
  },
];
