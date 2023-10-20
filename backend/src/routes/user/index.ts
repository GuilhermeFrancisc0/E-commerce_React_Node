import express from 'express';

import { create, getAll, get, remove, update } from '../../controllers/user';

const Routes = express.Router();

Routes.get("/user", getAll);
Routes.post("/user", create);
Routes.get("/user/:id", get);
Routes.put("/user/:id", update);
Routes.delete("/user/:id", remove);

Routes.post("/auth", (req, res) => { });

export default Routes;