const DocumentsToSignController = require('eficar/controllers/documentsToSign.controller');
const Auction = require('eficar/models/auctions.model');
const Assistances = require('eficar/models/assistances.model');
const DocumentsToSign = require('eficar/models/documentsToSign.model');
const AmicesDocumentsToSign = require('amices/models/documentsToSign.model');
const { PATH_ENDPOINT_CORE_GET_ASSISTANCES_FOR_LOAN } = require('eficar/core.services');
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

module.exports = async ({ loanApplicationId, financingEntityId }) => {
  try {
    const response = await HTTP.get(`${CORE_URL}${PATH_ENDPOINT_CORE_GET_ASSISTANCES_FOR_LOAN}/${loanApplicationId}`);
    const { amicarAssistance } = response.data;

    const eficarAssistances = await Assistances.find({});

    // deletes the previously generated assistances
    await DocumentsToSign.deleteMany({
      loanApplicationId,
      'documentType.externalCode': { $in: eficarAssistances.map((assistance) => assistance.documentTypeId) },
    });

    await AmicesDocumentsToSign.deleteMany({
      loanApplicationId,
      'documentType.externalCode': { $in: eficarAssistances.map((assistance) => assistance.documentTypeId) },
    });

    // generates the new assistances using the core's response
    const assistancesToGenerate = eficarAssistances.filter((assistance) =>
      amicarAssistance.some((coreAssistance) => coreAssistance.id === assistance.id && coreAssistance.selected),
    );

    // generates the required mandate assistance
    assistancesToGenerate.push(eficarAssistances[4]);

    if (!assistancesToGenerate.length) return;

    // finds loan data to pre-fill the assistance templates
    const loanData = await Auction.findOne({ simulationId: loanApplicationId, financingEntityId });

    for (const assistance of assistancesToGenerate) {
      assistance.value = await generateAssistancePDF(assistance.documentTypeId, loanData);
    }

    // upload assistances like any other document to sign sent by the FE
    const uploadDocumentsResponse = await DocumentsToSignController.sendDocumentsToCore({
      loanApplicationId,
      feIdentificationValue: financingEntityId,
      files: assistancesToGenerate.map((assistance) => ({
        documentTypeId: assistance.documentTypeId,
        filesContent: [
          {
            fileName: assistance.description,
            content: assistance.value,
          },
        ],
      })),
    });

    // after uploading, this assistances should be marked as required so that they can not be deleted
    for (const assistance of assistancesToGenerate) {
      const document = await DocumentsToSign.findOne({
        loanApplicationId,
        'documentType.externalCode': assistance.documentTypeId,
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
