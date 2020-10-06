const home = async (req, res) => {
  res.json({
    message: 'Welcome to amices API',
  });
};

module.exports = { home };
