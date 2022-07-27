import mongoose from '##/database';


const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  likes: [{
    type: String,
  }],
  answered: {
    type: Boolean,
    default: false,
  },
  focused: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  }
}, { timestamps: true });


export default mongoose.model("Question", QuestionSchema);