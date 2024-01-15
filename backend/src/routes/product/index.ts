import express from 'express';

import {
    addCart, create, favorite, finalizeCart, get, getCart, getFavorites, getOptions, list, remove,
    removeCart, update
} from '../../controllers/product';
import { Permissions } from '../../enum/permissions';
import { verifyPermissions } from '../../middlewares/auth';

const BASE_URL = '/products'

const Routes = express.Router();

Routes.get(BASE_URL, list);

Routes.get(`${BASE_URL}/options`, getOptions);

// Favorite
Routes.get(`${BASE_URL}/favorite`, getFavorites);
Routes.put(`${BASE_URL}/:id/favorite`, favorite);

// Cart
Routes.get(`${BASE_URL}/cart`, verifyPermissions([Permissions.CLIENT]), getCart);
Routes.post(`${BASE_URL}/cart/finalize`, verifyPermissions([Permissions.CLIENT]), finalizeCart);
Routes.post(`${BASE_URL}/cart/:id`, verifyPermissions([Permissions.CLIENT]), addCart);
Routes.delete(`${BASE_URL}/cart/:idx`, verifyPermissions([Permissions.CLIENT]), removeCart);

// Products Edit
Routes.post(`${BASE_URL}`, verifyPermissions([Permissions.ADMIN]), create);
Routes.get(`${BASE_URL}/:id`, verifyPermissions([Permissions.ADMIN]), get);
Routes.put(`${BASE_URL}/:id`, verifyPermissions([Permissions.ADMIN]), update);
Routes.delete(`${BASE_URL}/:id`, verifyPermissions([Permissions.ADMIN]), remove);

export default Routes;