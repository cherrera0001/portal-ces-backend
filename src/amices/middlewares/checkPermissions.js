module.exports = (permissions) => (req, res, next) => {
  if (req.user.permissions === permissions) return next();
  res.status(401).end();
};
