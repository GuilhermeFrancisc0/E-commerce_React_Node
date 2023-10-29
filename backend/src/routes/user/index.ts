import express from 'express';

import { create, get, getAll, remove, update } from '../../controllers/user';
import { Permissions } from '../../enum/permissions';
import { verifyPermissions } from '../../middlewares/auth';

const Routes = express.Router();

Routes.get("/user", verifyPermissions([Permissions.ADMIN]), getAll);
Routes.post("/user", create);
Routes.get("/user/:id", verifyPermissions([Permissions.ADMIN]), get);
Routes.put("/user/:id", verifyPermissions([Permissions.ADMIN]), update);
Routes.delete("/user/:id", verifyPermissions([Permissions.ADMIN]), remove);

export default Routes;