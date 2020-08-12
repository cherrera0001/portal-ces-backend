const router = require('express-promise-router')();

// router.use('', require('routes/security.routes'));
router.use('/params', require('routes/params.routes'));

module.exports = router;
