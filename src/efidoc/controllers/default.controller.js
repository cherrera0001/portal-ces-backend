const home = async (req, res) => {
  res.json({
    message: 'Welcome to Efidoc API',
  });
};

module.exports = { home };
