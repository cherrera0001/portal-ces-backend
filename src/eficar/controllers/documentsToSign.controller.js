const DocumentsToSign = require('eficar/models/documentsToSign.model');
const Configs = require('eficar/models/configs.model');
const errors = require('eficar/errors');
const HTTP = require('requests');
const _ = require('lodash');

const upload = async (req, res) => {
  const { loanApplicationId, files } = req.body;
  const uploadDocuments = await DocumentsToSign.findOne({ loanApplicationId });
  if (!uploadDocuments) return errors.notFound(res);

  const config = await Configs.findOne();
  const url = config.coreUrls.CORE_UPLOAD_DOCUMENTO_TO_SIGN;

  const response = await HTTP.post(url, {
    loanApplicationId,
    feIdentificationValue: req.user.companyIdentificationValue,
    files,
  });

  if (response.status !== 200) return errors.badRequest(res);

  const origin = _.keyBy(uploadDocuments.files, 'documentTypeId');
  const toMerge = _.keyBy(files, 'documentTypeId');

  const mergedFiles = _.mergeWith(origin, toMerge, function(objValue, srcValue, propertyName) {
    if (propertyName === 'filesContent') {
      return _.union(srcValue, objValue);
    }
  });

  uploadDocuments.files = _.values(mergedFiles);
  await uploadDocuments.update(uploadDocuments);

  res.status(200).end();
};

const download = async (req, res) => {
  const { loanApplicationId, documentType, uuid } = req.body;

  const config = await Configs.findOne();
  const url = config.coreUrls.DOWNLOAD_DOCUMENTO_TO_SIGN;

  const response = await HTTP.post(url, {
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
  const { loanApplicationId } = req.params;
  const { uuid, documentTypeId } = req.body;

  const documents = await DocumentsToSign.findOne({ loanApplicationId });
  if (!documents) return errors.notFound(res);

  const config = await Configs.findOne();
  const url = config.coreUrls.DELETE_DOCUMENT_TO_SIGN;

  const response = await HTTP.post(url, {
    loanApplicationId,
    feIdentificationValue: req.user.companyIdentificationValue,
    documentTypeId,
    uuid,
  });

  if (response.status !== 200) return errors.badRequest(res);

  res.json({
    ...response.data,
  });
};

const list = async (req, res) => {
  const { loanApplicationId } = req.params;
  const documents = await DocumentsToSign.findOne({ loanApplicationId });

  if (!documents) return errors.notFound(res);

  res.json(documents.files);
};

module.exports = {
  upload,
  download,
  deleteDocuments,
  list,
};
