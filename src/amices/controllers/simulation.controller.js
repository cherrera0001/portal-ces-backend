const HTTP = require('requests');

const CoreParamsModel = require('amices/models/coreParams.model');

const { CORE_URL } = process.env;
const { PATH_ENDPOINT_CORE_GET_BRANDS_FOR_SALE_ROOM } = require('amices/core.services');

const getBrandsForSaleRoom = async (req, res) => {
  try {
    const getAllBrand = async () => {
      return await CoreParamsModel.find({ type: 'VEHICLE_BRAND' }).sort('name');
    };
    const url = `${CORE_URL}${PATH_ENDPOINT_CORE_GET_BRANDS_FOR_SALE_ROOM}/${req.params.saleRoomId}`;
    const response = await HTTP.get(url);
    if (response.status === 200 && response.data.length) return res.status(200).json(response.data);
    return res.status(200).json(await getAllBrand());
  } catch (e) {
    throw Error(e.message);
  }
};

module.exports = { getBrandsForSaleRoom };
