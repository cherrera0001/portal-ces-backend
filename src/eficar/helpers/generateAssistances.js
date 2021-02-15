const DocumentsToSignController = require('eficar/controllers/documentsToSign.controller');
const Auction = require('eficar/models/auctions.model');
const Assistances = require('eficar/models/assistances.model');
const DocumentsToSign = require('eficar/models/documentsToSign.model');
const AmicesDocumentsToSign = require('amices/models/documentsToSign.model');
const { PATH_ENDPOINT_CORE_GET_ASSISTANCES_FOR_LOAN } = require('eficar/core.services');
const fixtureAssistances = require('fixtures/assistances');

const HTTP = require('requests');

const {
  generateProtecar,
  generateTireProtection,
  generateMandate,
  generateProtectedFamily,
  generateMecanicalGuaranty,
} = require('eficar/templates/assistances');

const { CORE_URL } = process.env;

const generateAssistancePDF = async (assistance, loanData) => {
  let assistancePDF;

  const customer = {
    name: `${loanData.customer.name} ${loanData.customer.lastName}`,
    identificationValue: loanData.customer.identificationValue,
    address: loanData.customer.address,
    email: loanData.customer.email,
  };

  const vehicle = {
    plateNumber: loanData.loanSimulationCar.licensePlate,
    carBrand: loanData.loanSimulationCar.carBrandDescription,
    carModel: loanData.loanSimulationCar.carModelDescription,
    carYear: loanData.loanSimulationCar.year,
  };

  const contract = {};

  switch (assistance) {
    case 'FAMILIA_PROTEGIDA':
      assistancePDF = generateProtectedFamily({ customer });
      break;
    case 'GARANTIA_MECANICA':
      assistancePDF = generateMecanicalGuaranty({
        contract,
        vehicle,
        customer,
      });
      break;
    case 'NEUMATICOS':
      assistancePDF = generateTireProtection({
        contract,
        vehicle,
        customer,
      });
      break;
    case 'PROTECAR':
      assistancePDF = generateProtecar({
        contract,
        vehicle,
        customer,
      });
      break;
    case 'MANDATO':
      assistancePDF = generateMandate({ customer });
      break;
    default:
      break;
  }

  return assistancePDF;
};

const FES_WITH_DOCUMENT_GENERATION = [
  {
    id: '2',
    identificationValue: '966675608',
  },
  {
    id: '4',
    identificationValue: '760022934',
  },
  {
    id: '9',
    identificationValue: '78624210K',
  },
];

const shouldGenerateAssistancesForFE = (financingEntityId) => {
  return !FES_WITH_DOCUMENT_GENERATION.some(
    (ef) => ef.id === financingEntityId || ef.identificationValue === financingEntityId,
  );
};

module.exports = async ({ loanApplicationId, financingEntityId }) => {
  try {
    let coreAssistances = [];
    /**
     * generates the new assistances using the core's response
     * some FE's generate and upload their own assistance documents, so we avoid generating our own as we would overwritte theirs.
     */
    const shouldGenerateDocuments = shouldGenerateAssistancesForFE(String(financingEntityId));

    if (shouldGenerateDocuments) {
      // deletes the previously generated assistances
      const assistanceDocuments = fixtureAssistances.map((assistance) => assistance.coreParamId);
      await DocumentsToSign.deleteMany({
        loanApplicationId,
        'documentType.externalCode': { $in: assistanceDocuments },
      });
      await AmicesDocumentsToSign.deleteMany({
        loanApplicationId,
        'documentType.externalCode': { $in: assistanceDocuments },
      });

      // maps the assistance documents that the CORE has selected at the time of this request
      const response = await HTTP.get(`${CORE_URL}${PATH_ENDPOINT_CORE_GET_ASSISTANCES_FOR_LOAN}/${loanApplicationId}`);
      const { amicarAssistance } = response.data;

      coreAssistances = amicarAssistance
        .filter((assistance) => assistance.selected)
        .map((assistance) => assistance.description);
    }

    const assistancesToGenerate = await Assistances.find({
      $or: [{ documentTypeId: { $in: coreAssistances } }, { documentTypeId: 'MANDATO' }],
    });

    if (!assistancesToGenerate.length) return;

    // finds loan data to pre-fill the assistance templates
    const loanData = await Auction.findOne({ simulationId: loanApplicationId, financingEntityId });

    for (const assistance of assistancesToGenerate) {
      assistance.value = await generateAssistancePDF(assistance.coreParamId, loanData);
    }

    // upload assistances like any other document to sign sent by the FE
    const uploadDocumentsResponse = await DocumentsToSignController.sendDocumentsToCore({
      loanApplicationId,
      feIdentificationValue: financingEntityId,
      files: assistancesToGenerate.map((assistance) => ({
        documentTypeId: assistance.coreParamId,
        filesContent: [
          {
            fileName: assistance.description,
            content: assistance.value,
          },
        ],
      })),
    });

    // after uploading, this assistances should be marked as required so that they can not be deleted from eficar
    for (const assistance of assistancesToGenerate) {
      const document = await DocumentsToSign.findOne({
        loanApplicationId,
        'documentType.externalCode': assistance.coreParamId,
      });

      if (document) {
        document.required = true;
        await document.save();
      }
    }
    return uploadDocumentsResponse;
  } catch (err) {
    console.error(err.message);
  }
};
