import { Router } from "express";

import UserController from "../controllers/UserController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const routes = Router();

// routes.use(AuthMiddlewaree);
routes.post('/register', UserController.createUser);


export default routes;