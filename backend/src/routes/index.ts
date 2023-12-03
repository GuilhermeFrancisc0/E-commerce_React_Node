import express from 'express';

import AuthRouter from './auth';
import ProductRouter from './product';
import UserRouter from './user';

const Routes = express.Router();

Routes.use("/api", AuthRouter);
Routes.use("/api", UserRouter);
Routes.use("/api", ProductRouter);

export default Routes;