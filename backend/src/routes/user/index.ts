import express from 'express';

const Routes = express.Router();

Routes.get("/user", (req, res) => { });
Routes.post("/user", (req, res) => { });
Routes.get("/user/:id", (req, res) => { });
Routes.put("/user/:id", (req, res) => { });
Routes.delete("/user/:id", (req, res) => { });

Routes.post("/auth", (req, res) => { });

export default Routes;