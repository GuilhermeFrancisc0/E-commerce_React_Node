import express from 'express';

import { auth } from '../../controllers/auth';

const Routes = express.Router();

Routes.post("/auth", auth);

export default Routes;