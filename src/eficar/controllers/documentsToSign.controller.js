const DocumentsToSign = require('eficar/models/documentsToSign.model');
const Params = require('eficar/models/params.model');
const errors = require('eficar/errors');
const HTTP = require('requests');

const {
  PATH_ENDPOINT_CORE_UPLOAD_DOCUMENT_TO_SIGN,
  PATH_ENDPOINT_CORE_DOWNLOAD_DOCUMENT_TO_SIGN,
  PATH_ENDPOINT_CORE_DELETE_DOCUMENT_TO_SIGN,
} = require('eficar/core.services');

const { CORE_URL } = process.env;

const upload = async (req, res) => {
  const { loanApplicationId, files } = req.body;
  const response = await HTTP.post(`${CORE_URL}${PATH_ENDPOINT_CORE_UPLOAD_DOCUMENT_TO_SIGN}`, {
    loanApplicationId,
    feIdentificationValue: req.user.companyIdentificationValue,
    files,
  });

  if (response.status !== 200) return errors.badRequest(res);

  for (const { documentTypeId, filesContent } of response.data) {
    const filesToSave = filesContent.filter((file) => file.fileName && file.uuid);

    let document = await DocumentsToSign.findOne({
      loanApplicationId,
      'documentType.externalCode': documentTypeId,
    });

    if (document) {
      document.files = filesToSave;
      document.markModified('files');
    } else {
      const documentType = await Params.findOne({ type: 'DOCUMENT_TYPE', externalCode: documentTypeId }).select(
        'id name externalCode parentId type',
      );

      const documentClassification = await Params.findOne({ id: documentType.parentId }).select(
        'id name externalCode parentId type',
      );

      document = new DocumentsToSign({
        loanApplicationId,
        documentType,
        documentClassification,
        files: filesToSave,
      });
    }

    await document.save();
  }

  req.app.socketIo.emit(`RELOAD_EFICAR_DOCUMENTS_TO_SIGN_${loanApplicationId}`);
  return res.status(200).json();
};

const download = async (req, res) => {
  const { loanApplicationId, documentType, uuid } = req.body;

  try {
    const response = await HTTP.post(`${CORE_URL}${PATH_ENDPOINT_CORE_DOWNLOAD_DOCUMENT_TO_SIGN}`, {
      loanApplicationId,
      documentType,
      uuid,
      requestFromAmices: true,
    });

    if (response.status !== 200) return errors.badRequest(res);

    res.json({
      ...response.data,
    });
  } catch (err) {}
};

const deleteDocuments = async (req, res) => {
  const { loanApplicationId, files, documentTypeId } = req.body;

  const documents = await DocumentsToSign.findOne({ loanApplicationId, 'documentType.externalCode': documentTypeId });
  if (!documents) return errors.notFound(res);
  try {
    for (const file of files) {
      await HTTP.post(`${CORE_URL}${PATH_ENDPOINT_CORE_DELETE_DOCUMENT_TO_SIGN}`, {
        loanApplicationId,
        feIdentificationValue: req.user.companyIdentificationValue,
        documentTypeId,
        uuid: file.uuid,
      });
    }

    await DocumentsToSign.deleteOne({ loanApplicationId, 'documentType.externalCode': documentTypeId });
    req.app.socketIo.emit(`RELOAD_EFICAR_DOCUMENTS_TO_SIGN_${loanApplicationId}`);
    res.json();
  } catch (err) {
    req.app.socketIo.emit(`RELOAD_EFICAR_DOCUMENTS_TO_SIGN_${loanApplicationId}`);
    res.status(500);
  }
};

const list = async (req, res) => {
  const { loanApplicationId } = req.params;
  const documents = await DocumentsToSign.find({ loanApplicationId });

  if (!documents) return errors.notFound(res);

  res.json(documents);
};

module.exports = {
  upload,
  download,
  deleteDocuments,
  list,
};
