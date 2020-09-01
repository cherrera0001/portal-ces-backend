const mongoose = require('mongoose');
const APIErrorsLog = require('models/apiErrorsLog.model');

module.exports = async (error, req, res, next) => {
  const requestId = mongoose.Types.ObjectId().toHexString();
  const oldJson = res.json;

  APIErrorsLog.create({
    requestId,
    method: req.method,
    headers: req.headers,
    url: req.url,
    body: req.body,
    type: 'REQUEST',
  });

  res.json = function(data) {
    APIErrorsLog.create({
      requestId,
      url: req.url,
      body: data,
      type: 'RESPONSE',
      error: error.message,
      errorStatus: error.statusCode,
    });
    oldJson.apply(res, arguments);
  };

  next();
};
