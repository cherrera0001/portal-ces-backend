const aqp = require('api-query-params');
const Params = require('eficar/controllers/params.controller');
const DocumentsToSign = require('eficar/models/documentsToSign.model');
const Config = require('eficar/models/configs.model');
const errors = require('eficar/errors');
const HTTP = require('requests');
const { PATH_ENDPOINT_CORE_DOWNLOAD_DOCUMENTO_TO_SIGN } = require('eficar/core.services');

const { CORE_URL } = process.env;

const upload = async (req, res) => {};
const update = async (req, res) => {};
const download = async (req, res) => {
  const { loanApplicationId, documentType, uuid } = req.body;

  const response = await HTTP.post(`${CORE_URL}${PATH_ENDPOINT_CORE_DOWNLOAD_DOCUMENTO_TO_SIGN}`, {
    loanApplicationId,
    documentType,
    uuid,
  });

  if (response.status !== 200) return errors.badRequest(res);

  res.json({
    ...response.data,
  });
};
const deleteDocuments = async (req, res) => {};

module.exports = {
  update,
  upload,
  download,
  deleteDocuments,
};
