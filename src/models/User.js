import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  timestamps: true
});

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(this.password, salt);
  this.password = passwordHash;
  next();
})

export default mongoose.model("User", UserSchema);