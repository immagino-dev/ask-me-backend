import User from '##/models/User';
import bcrypt, { compareSync } from 'bcrypt';
import Token from '##/service/TokenService';

class AuthController {
  async signin(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email }).select('+password');

      if (!user) return res.status(400).json({ error: "email or password incorrect" });

      if (!(await bcrypt.compare(password, user.password))) return res.status(400).json({ error: "email or password incorrect" });

      const token = await Token.generateToken({ _id: user._id, name: user.name });

      user.password = undefined;

      return res.status(200).json({ user, token });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async autosignin(req, res) {

    const tokenHeader = req.headers.authorization;

    try {
      if (!tokenHeader) return res.status(401);

      const [, token] = tokenHeader.split(' ');

      const decoded = await Token.decodeToken(token);

      if (!decoded) return res.status(401).json({ user: null, token: null });

      return res.status(200).json({ user: decoded, token });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new AuthController();