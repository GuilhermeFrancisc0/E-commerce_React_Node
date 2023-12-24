import express from 'express';

import {
    create, favorite, get, getFavorites, list, remove, update
} from '../../controllers/product';
import { Permissions } from '../../enum/permissions';
import { verifyPermissions } from '../../middlewares/auth';

const Routes = express.Router();

Routes.get("/products", list);

Routes.get("/products/favorite", getFavorites);
Routes.put("/products/:id/favorite", favorite);

Routes.post("/products", verifyPermissions([Permissions.ADMIN]), create);
Routes.get("/products/:id", verifyPermissions([Permissions.ADMIN]), get);
Routes.put("/products/:id", verifyPermissions([Permissions.ADMIN]), update);
Routes.delete("/products/:id", verifyPermissions([Permissions.ADMIN]), remove);

export default Routes;