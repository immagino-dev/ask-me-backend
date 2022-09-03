import Question from "../models/Question";
import Room from "../models/Room";

class QuestionService {
  async createQuestion(question_create, room, _id) {
    const question = await Question.create({ question: question_create, user: _id, room: room });
    const roomUpdated = await Room.findByIdAndUpdate(room, { $push: { questions: question._id } }, { new: true }).populate([{ path: 'questions', populate: { path: 'user' }, options: { sort: { 'focus': -1, 'answered': 1, 'likes': -1 } } }]);
    return { question, roomUpdated };
  }
  async getQuestions() {
    const questions = await Question.find();
    return { questions };
  }
  async getQuestionsByRoom(_room) {
    const room = await Room.findById(_room).populate([{ path: 'questions', populate: { path: 'user' }, options: { sort: { 'focused': -1, 'answered': 1, 'likes': 1 } } }]);
    return { room }
  }
  async likeQuestion(_question, _id) {
    const question = await Question.findByIdAndUpdate(_question, { $push: { likes: _id } }, { new: true }).populate([{ path: 'user' }]);
    return { question };
  }
  async answeredQuestion(_question) {
    const question = await Question.findByIdAndUpdate(_question, { $set: { focused: false, answered: true } }, { new: true }).populate([{ path: 'user' }]);
    return { question };
  }
  async focusedQuestion(_question) {
    const question = await Question.findByIdAndUpdate(_question, { $set: { focused: true } }, { new: true }).populate([{ path: 'user' }]);
    return { question };
  }
  async deleteQuestion(_question) {
    await Question.findByIdAndDelete(_question);
    return { message: 'Question deleted' };
  }
}

export default new QuestionService();