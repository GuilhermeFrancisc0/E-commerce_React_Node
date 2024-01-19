import { ReactElement } from 'react';

import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';

import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductsEdit from '../pages/ProductsEdit';
import { Permissions } from '../store/Auth/auth.type';
import PurchasesHistory from '../pages/PurchasesHistory';

export interface IRoutes {
  component: ReactElement;
  path: string;
  label: string;
  tabIcon: ReactElement;
  permissions?: Permissions;
}

export const ROUTES: IRoutes[] = [
  {
    component: <Home />,
    path: '/',
    label: 'Início',
    tabIcon: <HomeIcon />,
  },
  {
    component: <ProductsEdit />,
    path: '/products-edit',
    label: 'Produtos',
    tabIcon: <AddBusinessIcon />,
    permissions: ['ADMIN'],
  },
  {
    component: <Products />,
    path: '/products',
    label: 'Produtos',
    tabIcon: <StoreIcon />,
    permissions: ['CLIENT'],
  },
  {
    component: <PurchasesHistory />,
    path: '/purchases-history',
    label: 'Histórico',
    tabIcon: <HistoryIcon />,
    permissions: ['CLIENT'],
  },
];
