export function BadRequestError(message) {
  const error = new Error(message);
  error.name = "BadRequestError";
  error.status = 400;
  return error;
}
export function UnauthorizedError(message) {
  const error = new Error(message);
  error.name = "UnauthorizedError";
  error.status = 401;
  return error;
}

export function ForbiddenError(message) {
  const error = new Error(message);
  error.name = "ForbiddenError";
  error.status = 403;
  return error;
}

export function InternalError(message) {
  const error = new Error(message);
  error.name = "InternalError";
  error.status = 500;
  return error;
}