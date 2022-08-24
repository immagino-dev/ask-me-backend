import { Router } from "express";

import AuthController from "../controllers/AuthController";

const routes = Router();

routes.post('/signin', AuthController.signin);
routes.get('/autosignin', AuthController.autosignin);


export default routes;