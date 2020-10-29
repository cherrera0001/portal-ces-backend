const router = require('express-promise-router')();
const controller = require('amices/controllers/simulation.controller');
const authenticate = require('middlewares/authenticate.middleware');

router.route('/sales-rooms-brands/:saleRoomId').get(authenticate, controller.getBrandsForSaleRoom);

module.exports = router;
