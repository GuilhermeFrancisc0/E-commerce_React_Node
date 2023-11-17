import express from 'express';

import { handleRefreshToken, signIn, signOut } from '../../controllers/auth';

const Routes = express.Router();

Routes.post("/signIn", signIn);
Routes.get("/signOut", signOut);
Routes.get("/refreshToken", handleRefreshToken);

export default Routes;