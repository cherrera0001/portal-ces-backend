const HTTP = require('requests');
const CoreParamsModel = require('amices/models/coreParams.model');

const { CORE_URL } = process.env;
const { PATH_ENDPOINT_CORE_GET_RATE_SALE_CHANNERL } = require('amices/core.services');

const getVehicleTypeSaleChannel = async (req, res) => {
  try {
    const url = `${CORE_URL}${PATH_ENDPOINT_CORE_GET_RATE_SALE_CHANNERL}/${req.params.saleChannelId}`;
    const response = await HTTP.get(url);
    console.log(response.data);
    if (response.status === 200 && response.data.length) {
      let unique = [
        ...new Set(
          response.data.map(function(task) {
            return task.vehicleTypeId;
          }),
        ),
      ];
      const coreParams = await CoreParamsModel.find({
        type: 'VEHICLE_TYPE',
        internalCode: unique,
      });
      console.log(coreParams);
      return res.status(200).json(coreParams);
    }
  } catch (e) {
    throw Error(e.message);
  }
};

const getLoanTypeSaleChannel = async (req, res) => {
  try {
    const url = `${CORE_URL}${PATH_ENDPOINT_CORE_GET_RATE_SALE_CHANNERL}/${req.params.saleChannelId}/vehicle-type/${req.params.vehicleType}`;
    const response = await HTTP.get(url);
    if (response.status === 200 && response.data.length) {
      let unique = [
        ...new Set(
          response.data.map(function(task) {
            return task.loanTypeCode;
          }),
        ),
      ];
      console.log(unique);
      const coreParams = await CoreParamsModel.find({
        type: 'LOAN_TYPE',
        internalCode: unique,
      });
      console.log(coreParams, '-----');
      return res.status(200).json(coreParams);
    }
  } catch (e) {
    throw Error(e.message);
  }
};

const getRateTypeSaleChannel = async (req, res) => {
  try {
    const url = `${CORE_URL}${PATH_ENDPOINT_CORE_GET_RATE_SALE_CHANNERL}/${req.params.saleChannelId}/vehicle-type/${req.params.vehicleType}/loan-type/${req.params.loanType}`;
    const response = await HTTP.get(url);
    if (response.status === 200 && response.data.length) {
      let unique = [
        ...new Set(
          response.data.map(function(task) {
            return task.rateTypeCode;
          }),
        ),
      ];
      const coreParams = await CoreParamsModel.find({
        type: 'RATE_TYPE',
        internalCode: unique,
      });
      return res.status(200).json(coreParams);
    }
  } catch (e) {
    throw Error(e.message);
  }
};

module.exports = { getVehicleTypeSaleChannel, getLoanTypeSaleChannel, getRateTypeSaleChannel };
