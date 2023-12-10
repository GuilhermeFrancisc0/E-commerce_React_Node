import express from 'express';

import { create, get, list, remove, update } from '../../controllers/product';
import { Permissions } from '../../enum/permissions';
import { verifyPermissions } from '../../middlewares/auth';

const Routes = express.Router();

Routes.get("/productsEdit", verifyPermissions([Permissions.ADMIN]), list);
Routes.post("/productsEdit", verifyPermissions([Permissions.ADMIN]), create);
Routes.get("/productsEdit/:id", verifyPermissions([Permissions.ADMIN]), get);
Routes.put("/productsEdit/:id", verifyPermissions([Permissions.ADMIN]), update);
Routes.delete("/productsEdit/:id", verifyPermissions([Permissions.ADMIN]), remove);

export default Routes;