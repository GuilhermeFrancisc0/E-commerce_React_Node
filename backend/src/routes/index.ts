import express from 'express';

import AuthRouter from './auth';
import UserRouter from './user';

const Routes = express.Router();

Routes.use("/api", AuthRouter);
Routes.use("/api", UserRouter);

export default Routes;