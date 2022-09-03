import QuestionService from "../service/Question.service";
class QuestionController {
  async createQuestion(req, res, next) {
    const { room, question } = req.body;
    try {
      const { roomUpdated } = await QuestionService.createQuestion(question, room, req._id);
      req.io.to(room).emit('question', roomUpdated);
      return res.status(201).json({ roomUpdated });
    } catch (error) {
      next(error);
    }
  }

  async getQuestions(req, res, next) {
    try {
      const { questions } = await QuestionService.getQuestions();
      res.status(200).json({ questions });
    } catch (error) {
      next(error)
    }
  }

  async getQuestionsByRoom(req, res, next) {
    try {
      const { room } = await QuestionService.getQuestionsByRoom(req.params._room);
      res.status(200).json({ room });
    } catch (error) {
      next(error)
    }
  }
  async likeQuestion(req, res, next) {
    const { _question } = req.params;
    try {
      const { question } = await QuestionService.likeQuestion(_question, req._id);
      req.io.to(question.room.toString()).emit('like', question);
      res.status(200).json({ question });
    } catch (error) {
      next(error)
    }
  }
  async answeredQuestion(req, res, next) {
    const { _question } = req.params;
    try {
      const { question } = await QuestionService.answeredQuestion(_question);
      req.io.to(question.room.toString()).emit('answered', question);
      res.status(200).json({ question });
    } catch (error) {
      next(error)
    }
  }
  async focusedQuestion(req, res, next) {
    const { _question } = req.params;
    try {
      const { question } = await QuestionService.focusedQuestion(_question);
      req.io.to(question.room.toString()).emit('focus', question);
      res.status(200).json({ question });
    } catch (error) {
      next(error)
    }
  }
  async deleteQuestion(req, res, next) {
    const { _question } = req.params;
    try {
      await QuestionService.deleteQuestion(_question);
      res.status(200).json({ message: 'Question deleted' });
    } catch (error) {
      next(error)
    }
  }
}

export default new QuestionController();