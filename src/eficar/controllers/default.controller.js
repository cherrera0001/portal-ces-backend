const home = async (req, res) => {
  res.json({
    message: 'Welcome to eficar API',
  });
};

module.exports = { home };
