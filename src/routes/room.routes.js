import { Router } from "express";

import RoomController from "##/controllers/RoomController";
import AuthMiddleware from "##/middlewares/AuthMiddleware";

const routes = Router();

routes.get('/:_room', RoomController.getRoom);
routes.get('/list', RoomController.getRooms);
routes.use(AuthMiddleware);
routes.get('/my/:_room', RoomController.getMyRoom);
routes.post('/create', RoomController.createRoom);
routes.delete('/delete/:_room', RoomController.deleteRoom);
routes.patch('/update/:_room', RoomController.updateRoom);
export default routes;