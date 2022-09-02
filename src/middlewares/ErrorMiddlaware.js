export default async (err, req, res, next) => {
  const { name, status, message, stack } = err;
  if (name === 'CastError') return res.status(500).json({ name, message, stack });
  else if (status !== 500) return res.status(status).json({ name, message });
  else return res.status(500).json({ name, message, stack });
};