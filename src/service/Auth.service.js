
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { BadRequestError, UnauthorizedError } from '../utils/Errors'

class AuthService {
  async signin(email, password) {
    const user = await User.findOne({ email }).select('+password');

    if (!user) throw new BadRequestError('email or password incorrect');

    if (!(await bcrypt.compare(password, user.password))) throw new BadRequestError('email or password incorrect');

    const token = await this.generateToken({ _id: user._id, name: user.name });

    user.password = undefined;

    return { user, token };
  }

  async autosignin(tokenHeader) {
    if (!tokenHeader) throw new BadRequestError('');;

    const [, token] = tokenHeader.split(' ');

    const decoded = await this.decodeToken(token);

    if (!decoded) throw new UnauthorizedError('');

    return { user: decoded, token };
  }
  async generateToken(params = {}) {
    const token = await jwt.sign(params, process.env.JWT_SECRET, { expiresIn: '8h' });
    return token;
  }

  async decodeToken(token) {
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default new AuthService();