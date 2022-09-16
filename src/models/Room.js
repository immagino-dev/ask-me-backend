import mongoose from '../database';


const RoomSchema = new mongoose.Schema({
  opened: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  }]
}, {
  timestamps: true
});

export default mongoose.model("Room", RoomSchema);