import UserService from "../service/User.service";

class UserController {
  async createUser(req, res, next) {
    try {
      const { user, token } = await UserService.createUser(req.body);
      return res.status(201).json({ user, token });
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController();