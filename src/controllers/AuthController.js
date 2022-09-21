import AuthService from '../services/Auth.service';
class AuthController {
  async signin(req, res, next) {
    const { email, password } = req.body;
    try {
      const { user, token } = await AuthService.signin(email, password);
      return res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  }

  async autosignin(req, res, next) {
    const tokenHeader = req.headers.authorization;
    try {
      const { user, token } = await AuthService.autosignin(tokenHeader);
      return res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();