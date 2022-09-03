
import { uuid } from 'uuidv4';

import Logger from "../utils/Logger";

export default async (err, req, res, next) => {
  const { name, message, status, stack } = err;
  if (status || 500 !== 500) return res.status(status).json({ name, error: message });
  else {
    const id = uuid();
    Logger.error({ id, name, message, stack });
    return res.status(500).json({ id, message: 'Internal server error', error: name });
  }
};