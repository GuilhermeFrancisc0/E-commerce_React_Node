import express from 'express';

import UserRouter from './user';

const Routes = express.Router();

Routes.use("/api", UserRouter);

export default Routes;