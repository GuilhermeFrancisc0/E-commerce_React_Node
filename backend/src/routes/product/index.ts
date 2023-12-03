import express from 'express';

import { create, get, list, remove, update } from '../../controllers/product';
import { Permissions } from '../../enum/permissions';
import { verifyPermissions } from '../../middlewares/auth';

const Routes = express.Router();

Routes.get("/productEdit", verifyPermissions([Permissions.ADMIN]), list);
Routes.post("/productEdit", verifyPermissions([Permissions.ADMIN]), create);
Routes.get("/productEdit/:id", verifyPermissions([Permissions.ADMIN]), get);
Routes.put("/productEdit/:id", verifyPermissions([Permissions.ADMIN]), update);
Routes.delete("/productEdit/:id", verifyPermissions([Permissions.ADMIN]), remove);

export default Routes;