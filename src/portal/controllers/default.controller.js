const home = async (req, res) => {
  res.json({
    message: 'Welcome to portal API',
  });
};

module.exports = { home };
