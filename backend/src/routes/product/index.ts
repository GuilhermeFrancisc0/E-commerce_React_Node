import express from 'express';

import {
    addCart, create, evaluateProduct, favorite, finalizeCart, get, getCart, getFavorites,
    getOptions, getPurchasesHistory, list, remove, removeCart, update
} from '../../controllers/product';
import { Permissions } from '../../enum/permissions';
import { verifyPermissions } from '../../middlewares/auth';

const BASE_URL = '/products'

const Routes = express.Router();

Routes.get(BASE_URL, list);

Routes.get(`${BASE_URL}/options`, getOptions);

// Evaluation
Routes.post(`${BASE_URL}/evaluation/:id`, verifyPermissions([Permissions.CLIENT]), evaluateProduct);

// Purchase History
Routes.get(`${BASE_URL}/purchasesHistory`, verifyPermissions([Permissions.CLIENT]), getPurchasesHistory);

// Favorite
Routes.get(`${BASE_URL}/favorite`, verifyPermissions([Permissions.CLIENT]), getFavorites);
Routes.put(`${BASE_URL}/:id/favorite`, verifyPermissions([Permissions.CLIENT]), favorite);

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