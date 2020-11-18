const router = require('express-promise-router')();
const controller = require('amices/controllers/rates.controller');
const authenticate = require('middlewares/authenticate.middleware');

router.route('/sale-channel/:saleChannelId').get(authenticate, controller.getVehicleTypeSaleChannel);
router
  .route('/sale-channel/:saleChannelId/vehicle-type/:vehicleType')
  .get(authenticate, controller.getLoanTypeSaleChannel);
router
  .route('/sale-channel/:saleChannelId/vehicle-type/:vehicleType/loan-type/:loanType')
  .get(authenticate, controller.getRateTypeSaleChannel);

module.exports = router;
