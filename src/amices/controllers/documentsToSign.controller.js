const DocumentsToSign = require('amices/models/documentsToSign.model');
const Params = require('amices/models/coreParams.model');
const errors = require('amices/errors');
const HTTP = require('requests');
const { PATH_ENDPOINT_CORE_DOWNLOAD_DOCUMENT_TO_SIGN } = require('eficar/core.services');

const { CORE_URL } = process.env;

const list = async (req, res) => {
  const { loanApplicationId } = req.params;
  const documents = await DocumentsToSign.find({ loanApplicationId });

  if (!documents) return errors.notFound(res);

  const classifications = documents.map((doc) => doc.documentClassification);

  res.json({
    financingEntityId: documents[0].financingEntityId,
    documentsToSign: classifications.map((classification) => {
      const documentTypes = documents.filter((doc) => doc.documentType.parentId === classification.id);
      return {
        name: classification.name,
        documents: documentTypes.map((docType) => ({
          document: docType.documentType,
          files: docType.files,
          updatedAt: docType.updatedAt,
        })),
      };
    }),
  });
};

const download = async (req, res) => {
  const { loanApplicationId, documentType, uuid } = req.body;

  const response = await HTTP.post(`${CORE_URL}${PATH_ENDPOINT_CORE_DOWNLOAD_DOCUMENT_TO_SIGN}`, {
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
  const { loanApplicationId, documentTypeId } = req.body;
  await DocumentsToSign.deleteOne({ loanApplicationId, 'documentType.externalCode': documentTypeId });
  req.app.socketIo.emit(`RELOAD_AMICES_DOCUMENTS_TO_SIGN_${loanApplicationId}`);
  res.json();
};

const update = async (req, res) => {
  // This function is called when documents to sign files are sent by eficar
  if (!req.body.message.data) return errors.badRequest(res);
  const { loanApplicationId, files, financingEntityId = 1 } = req.body.message.data;
  const { coreParamId, filesContent } = files[0]; // this is a temporary map and could be fixed by sending this parameter on the request's body.

  let document = await DocumentsToSign.findOne({ loanApplicationId, 'documentType.id': coreParamId });

  if (document) {
    document.files = filesContent;
    document.markModified('files');
  } else {
    const documentType = await Params.findOne({ id: coreParamId }).select('id name externalCode parentId type');
    const documentClassification = await Params.findOne({ id: documentType.parentId }).select(
      'id name externalCode parentId type',
    );

    document = new DocumentsToSign({
      loanApplicationId,
      financingEntityId,
      documentType,
      documentClassification,
      files: filesContent,
    });
  }

  await document.save();
  req.app.socketIo.emit(`RELOAD_AMICES_DOCUMENTS_TO_SIGN_${loanApplicationId}`);
  return res.status(200).json();
};

module.exports = {
  list,
  update,
  download,
  deleteDocuments,
};
