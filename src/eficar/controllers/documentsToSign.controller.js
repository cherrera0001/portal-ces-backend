const aqp = require('api-query-params');
const Params = require('eficar/controllers/params.controller');
const DocumentsToSign = require('eficar/models/documentsToSign.model');
const Config = require('eficar/models/configs.model');
const errors = require('eficar/errors');
const HTTP = require('requests');
const { PATH_ENDPOINT_CORE_DOWNLOAD_DOCUMENTO_TO_SIGN } = require('eficar/core.services');
const _ = require('lodash');

const { CORE_URL } = process.env;

const upload = async (req, res) => {
  const newDocuments = await new DocumentsToSign(req.body)
  await newDocuments.save();
  res.status(201).end();
};

const update = async (req, res) => {
  const { loanApplicationId, files } = req.body;
  const uploadDocuments = await DocumentsToSign.findOne({ loanApplicationId: loanApplicationId});
  if (!uploadDocuments) return errors.notFound(res);

  const origin = _.keyBy(uploadDocuments.files,'documentTypeId')
  const toMerge = _.keyBy(files,'documentTypeId')

  const mergedFiles = _.mergeWith(origin, toMerge, function (objValue, srcValue,propertyName) {
    if (propertyName === 'filesContent') {
      return _.union(srcValue,objValue);
    }
  })

  uploadDocuments.files = _.values(mergedFiles)

  await uploadDocuments.update(uploadDocuments)

  res.status(200).end();
};

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

const deleteDocuments = async (req, res) => {

};

module.exports = {
  update,
  upload,
  download,
  deleteDocuments,
};
