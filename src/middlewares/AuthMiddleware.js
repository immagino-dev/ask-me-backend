import TokenService from "../service/TokenService";

export default async (req, res, next) => {

  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ error: "Token not provided" });

  const parts = header.split(" ");

  if (!parts === 2) return res.status(401).json({ error: "Token error" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: "Token malformatted" });

  const decoded = await TokenService.decodeToken(token);

  if (!decoded) return res.status(401).json({ error: "Token invalid" });

  req._id = decoded._id;

  return next()
};