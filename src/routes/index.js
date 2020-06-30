const router = require('express-promise-router')();

router.use('/params', require('routes/params.routes'));

module.exports = router;
