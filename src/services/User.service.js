import User from "../models/User";

import AuthService from "./Auth.service";

import { BadRequestError } from '../utils/Errors';

class UserService {
  async createUser(body) {
    const { email } = body;
    if (await User.findOne({ email })) throw new BadRequestError('User already exists');
    const user = await User.create(body);
    user.password = undefined;
    const token = await AuthService.generateToken({ _id: user._id, name: user.name });
    return { user, token };
  }
}

export default new UserService();