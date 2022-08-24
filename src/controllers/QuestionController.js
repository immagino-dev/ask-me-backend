import Question from "../models/Question";
import Room from "../models/Room";

class QuestionController {
  async createQuestion(req, res) {
    const { room } = req.body;
    try {
      const question = await Question.create({ question: req.body.question, user: req._id, room: room });
      const roomUpdated = await Room.findByIdAndUpdate(room, { $push: { questions: question._id } }, { new: true }).populate([{ path: 'questions', populate: { path: 'user' }, options: { sort: { 'focus': -1, 'answered': 1, 'likes': -1 } } }]);
      req.io.to(room).emit('question', roomUpdated);
      return res.status(201).json({ roomUpdated });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getQuestions(req, res) {
    try {
      const questions = await Question.find();
      res.status(200).json({ questions });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getQuestionsByRoom(req, res) {
    try {
      const room = await Room.findById(req.params._room).populate([{ path: 'questions', populate: { path: 'user' }, options: { sort: { 'focused': -1, 'answered': 1, 'likes': 1 } } }]);
      res.status(200).json({ room });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async likeQuestion(req, res) {
    const { _question } = req.params;
    try {
      const question = await Question.findByIdAndUpdate(_question, { $push: { likes: req._id } }, { new: true }).populate([{ path: 'user' }]);
      console.log(question);
      req.io.to(question.room.toString()).emit('like', question);
      res.status(200).json({ question });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async answeredQuestion(req, res) {
    const { _question } = req.params;
    try {
      const question = await Question.findByIdAndUpdate(_question, { $set: { focused: false, answered: true } }, { new: true }).populate([{ path: 'user' }]);
      req.io.to(question.room.toString()).emit('answered', question);
      res.status(200).json({ question });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async focusedQuestion(req, res) {
    const { _question } = req.params;
    try {
      const question = await Question.findByIdAndUpdate(_question, { $set: { focused: true } }, { new: true }).populate([{ path: 'user' }]);
      req.io.to(question.room.toString()).emit('focus', question);
      res.status(200).json({ question });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async deleteQuestion(req, res) {
    const { _question } = req.params;
    try {
      const question = await Question.findByIdAndDelete(_question);
      res.status(200).json({ message: 'Question deleted' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new QuestionController();