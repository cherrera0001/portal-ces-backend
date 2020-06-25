const home = async (req, res) => {
  res.json({
    message: 'Welcome to Amidoc API',
  });
};

module.exports = { home };
