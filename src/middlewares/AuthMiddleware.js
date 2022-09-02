import AuthService from "../service/Auth.service";

import { BadRequestError, UnauthorizedError } from '../utils/Errors';

export default async (req, res, next) => {

  try {
    const header = req.headers.authorization;

    // if (!header) return res.status(401).json({ error: "Token not provided" });
    if (!header) throw new BadRequestError('Token not provided');

    const parts = header.split(" ");

    if (!parts === 2) throw new BadRequestError('Token error');

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) throw new BadRequestError('Token malformatted');

    const decoded = await AuthService.decodeToken(token);

    if (!decoded) throw new UnauthorizedError('Token invalid');
    req._id = decoded._id;

    return next()
  } catch (error) {
    return next(error)
  }
};