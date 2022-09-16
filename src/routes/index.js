import { Router } from "express";

import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import roomRoutes from "./room.routes";
import questionRoutes from "./question.routes";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/question', questionRoutes)
routes.use('/room', roomRoutes);
routes.use('/user', userRoutes);
// routes.use(AuthMiddleware);

export default routes;