import User from "../models/User"
import Token from '../service/TokenService';

class UserController {
  async createUser(req, res) {
    const { email } = req.body
    try {
      if (await User.findOne({ email })) return res.status(400).json({ error: "User already exists" })
      const user = await User.create(req.body);
      user.password = undefined;
      const token = await Token.generateToken({ _id: user._id, name: user.name });
      return res.status(201).json({ user, token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req, res) {

  }
}

export default new UserController();