const DocumentsToSign = require('amices/models/documentsToSign.model');
const Params = require('amices/models/coreParams.model');
const Loans = require('amices/models/loanApplications.model');
const errors = require('amices/errors');
const HTTP = require('requests');
const { PATH_ENDPOINT_CORE_DOWNLOAD_DOCUMENT_TO_SIGN } = require('eficar/core.services');

const { CORE_URL } = process.env;

const list = async (req, res) => {
  const { loanApplicationId } = req.params;
  const documents = await DocumentsToSign.find({ loanApplicationId });

  if (!documents.length) return errors.notFound(res);

  const classifications = await Params.find({ type: 'DOCUMENT_CLASSIFICATION' }).select(
    'id name externalCode parentId type',
  );

  const documentsToSign = classifications.map((classification) => {
    const documentTypes = documents.filter((doc) => doc.documentType.parentId === classification.id);
    return {
      name: classification.name,
      documents: documentTypes.map((docType) => ({
        document: docType.documentType,
        files: docType.files,
        updatedAt: docType.updatedAt,
      })),
    };
  });

  const loan = await Loans.findOne({ simulationId: loanApplicationId });

  res.json({
    financingEntityId: documents[0].financingEntityId,
    awarded: loan.status === 'AWARDED',
    awardedAt: loan.updatedAt,
    documentsToSign: documentsToSign.filter((classification) => classification.documents.length > 0),
  });
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
  if (!req.body.message.data) return errors.badRequest(res);
  const { loanApplicationId, documentTypeId, uuid } = req.body.message.data;

  const document = await DocumentsToSign.findOne({ loanApplicationId, 'documentType.externalCode': documentTypeId });
  if (!document) return errors.badRequest(res);

  const filteredDocuments = document.files.filter((file) => file.uuid !== uuid);

  if (filteredDocuments.length) {
    document.files = filteredDocuments;
    document.markModified('files');
    await document.save();
  } else {
    await DocumentsToSign.deleteOne({ loanApplicationId, 'documentType.externalCode': documentTypeId });
  }

  req.app.socketIo.emit(`RELOAD_DOCUMENTS_TO_SIGN_AMICES_${loanApplicationId}`);
  return res.status(200).json();
};

const update = async (req, res) => {
  // This function is called when documents to sign files are sent by eficar
  if (!req.body.message.data) return errors.badRequest(res);
  const { loanApplicationId, files, financingEntityId = 1 } = req.body.message.data;

  for (const { documentTypeId, filesContent } of files) {
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
        financingEntityId,
        documentClassification,
        files: filesToSave,
      });
    }

    await document.save();
  }
  req.app.socketIo.emit(`RELOAD_DOCUMENTS_TO_SIGN_AMICES_${loanApplicationId}`);
  return res.status(200).json();
};

module.exports = {
  list,
  update,
  download,
  deleteDocuments,
};
