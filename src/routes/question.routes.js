import { Router } from "express";

import QuetionController from "../controllers/QuestionController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
const routes = Router();

routes.get('/room/:_room', QuetionController.getQuestionsByRoom);
routes.get('/list', QuetionController.getQuestions);
routes.use(AuthMiddleware);
routes.post('/create', QuetionController.createQuestion);
routes.patch('/like/:_question', QuetionController.likeQuestion);
routes.patch('/answered/:_question', QuetionController.answeredQuestion);
routes.patch('/focused/:_question', QuetionController.focusedQuestion);
routes.delete('/delete/:_question', QuetionController.deleteQuestion);

export default routes;