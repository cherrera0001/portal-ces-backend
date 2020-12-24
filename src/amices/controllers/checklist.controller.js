const AuctionParticipants = require('amices/models/auctionParticipants.model');
const LoansApplication = require('amices/models/loanApplications.model');
const Assistances = require('amices/models/assistances.model');
const DocumentsToSign = require('eficar/models/documentsToSign.model');
const Params = require('amices/controllers/params.controller');
const errors = require('amices/errors');
const HTTP = require('requests');
const { PATH_ENDPOINT_CORE_GET_ASSISTANCES_FOR_LOAN } = require('amices/core.services');
const findLoanStatus = require('amices/helpers/findLoanStatus');
const documentsToSignController = require('eficar/controllers/documentsToSign.controller');

const {
  generateProtecar,
  generateTireProtection,
  generateMandate,
  generateProtectedFamily,
  generateMecanicalGuaranty,
} = require('amices/templates/assistances');

const { CORE_URL } = process.env;

const generateAssistancePDF = async (assistance, loanData) => {
  let assistancePDF;

  const customer = {
    name: `${loanData.customer.name} ${loanData.customer.lastName}`,
    identificationValue: loanData.customer.identificationValue,
    address: loanData.customer.address,
    email: loanData.customer.email,
    // city: '',
    // phone: '',
    // cellPhone: '',
  };

  const vehicle = {
    plateNumber: loanData.loanSimulationCar.licensePlate,
    carBrand: loanData.vehicleData.brandName,
    carModel: loanData.vehicleData.modelName,
    carYear: loanData.vehicleData.year,
    // carMileage: '',
    // chasisNumber: '',
  };

  const contract = {
    // startDate: '',
    // endDate: '',
    // contractNumber: '',
  };

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

const generateAssistanceDocuments = async ({ loanApplicationId, feIdentificationValue }) => {
  try {
    const response = await HTTP.get(`${CORE_URL}${PATH_ENDPOINT_CORE_GET_ASSISTANCES_FOR_LOAN}/${loanApplicationId}`);
    const { amicarAssistance } = response.data;
    const amicesAssistances = await Assistances.find({});
    const assistancesToGenerate = amicesAssistances.filter((assistance) =>
      amicarAssistance.some((coreAssistance) => coreAssistance.id === assistance.id && coreAssistance.selected),
    );
    assistancesToGenerate.push(amicesAssistances[4]);

    if (!assistancesToGenerate.length) return;

    // finds loan data to pre-fill the assistance templates
    const loanApplication = await LoansApplication.findOne({ simulationId: loanApplicationId });

    for (const assistance of assistancesToGenerate) {
      assistance.value = await generateAssistancePDF(assistance.documentTypeId, loanApplication);
    }

    // upload assistances like any other document to sign sent by the FE
    const uploadDocumentsResponse = await documentsToSignController.sendDocumentsToCore({
      loanApplicationId,
      feIdentificationValue,
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
    console.log(err.message);
  }
};

const update = async (req, res) => {
  // This function is called when a checklist item changes its status by being approved, rejected or downloaded
  if (!req.body.message.data) return errors.badRequest(res);
  const { loanApplicationId, feIdentificationValue, checkList, comment, status } = req.body.message.data;
  const auction = await AuctionParticipants.findOne({ loanApplicationId });
  if (!auction) return errors.badRequest(res, `Auction ${loanApplicationId} not found for checklist items info update`);

  for (const participant of auction.auctionParticipants) {
    if (participant.FinancingEntity.identificationValue === feIdentificationValue) {
      let newCheckListItems = [];

      for (const item of checkList.checkListItems) {
        newCheckListItems.push({
          ...item,
          ...(item.value && { value: item.value }),
          uuid: item.uuid ? JSON.parse(item.uuid).map(({ uuid }) => uuid) : null,
          CoreParam: await Params.getOne({ type: 'CHECKLIST', id: item.coreParamId }),
          status: item.newStatus,
        });
      }
      newCheckListItems = newCheckListItems.sort((a, b) => a.CoreParam.name.localeCompare(b.CoreParam.name));
      participant.Checklists[0].ChecklistItems = newCheckListItems;
      participant.Checklists[0].comment = comment;
      break;
    }
  }

  if (status) {
    const newLoanStatus = await findLoanStatus(status);
    auction.status = newLoanStatus;

    const loanApplication = await LoansApplication.findOne({ simulationId: loanApplicationId });
    if (loanApplication) {
      loanApplication.status = newLoanStatus;
      await loanApplication.save();
    }
  }

  if (status === 'CHECKLIST_CONFIRMED') {
    await generateAssistanceDocuments({ loanApplicationId, feIdentificationValue });
    req.app.socketIo.emit(`RELOAD_EFICAR_AUCTION_${loanApplicationId}`);
  }

  auction.markModified('auctionParticipants');
  await auction.save();
  req.app.socketIo.emit(`RELOAD_AUCTION_${loanApplicationId}`);
  req.app.socketIo.emit(`RELOAD_EFICAR_AUCTION_${loanApplicationId}`);
  req.app.socketIo.emit(`RELOAD_EFICAR_AUCTION_LIST_${feIdentificationValue}`);
  return res.status(200).json();
};

module.exports = { update };
