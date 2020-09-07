const aqp = require('api-query-params');
const Params = require('eficar/controllers/params.controller');
const Auction = require('eficar/models/auctions.model');
const findLoanStatus = require('eficar/helpers/findLoanStatus');
const errors = require('eficar/errors');
const HTTP = require('requests');
const { PATH_ENDPOINT_CORE_DOWNLOAD_DOCUMENT, PATH_ENDPOINT_CORE_DOCUMENT_STATUS } = require('eficar/core.services');

const { CORE_URL } = process.env;

const customerTypeMap = {
  RUC: 'PJ',
  DNI: 'PN',
};

const getCompleteItems = async (items) => {
  const checklistItems = [];

  for (const item of items) {
    const completeItem = await Params.getOne({
      type: 'CHECKLIST',
      id: item.coreParamId,
    });

    checklistItems.push({
      ...item,
      name: completeItem.name,
      status: item.status,
      externalCode: completeItem.externalCode,
    });
  }

  return checklistItems;
};

const checklist = async (req, res) => {
  const { skip, limit, sort, projection, population } = aqp({ ...req.query });
  const { stage } = req.params;
  const { loanSimulationDataId } = req.params;
  const loanSimulationData = await Auction.findOne({ 'loanSimulationData.id': loanSimulationDataId })
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .populate(population);

  if (!loanSimulationData) return errors.notFound(res);

  const identificationType = await Params.getOne({
    type: 'IDENTIFICATION_TYPE',
    externalCode: loanSimulationData.customer.identificationTypeId,
  });

  const customerTypeCode = customerTypeMap[identificationType.name];

  const checklistType = await Params.getOne({ type: 'CHECKLIST_TYPE', externalCode: stage });

  const checklistCustomertType = await Params.getOne({
    type: 'CHECKLIST_CUSTOMER_TYPE',
    parentId: checklistType.id,
    externalCode: customerTypeCode,
  });

  const checklistWorkingType = await Params.getOne({
    type: 'CHECKLIST_WORK_TYPE',
    parentId: checklistCustomertType.id,
    externalCode: loanSimulationData.customerActivity.workType.externalCode,
  });

  const checklist = await Params.get({
    type: 'CHECKLIST',
    parentId: checklistWorkingType.id,
  });

  checklist.push(
    checklist.splice(
      checklist.findIndex((el) => el.name === 'Otros'),
      1,
    )[0],
  );

  res.json({
    result: checklist,
  });
};

const reception = async (req, res) => {
  // a new document was uploaded in the amices iframe (uuid)
  if (!req.body) return errors.badRequest(res);

  for (const item of req.body) {
    const { loanSimulationDataId, checklistId, coreParamId, uuids, status } = item;
    const auction = await Auction.findOne({ simulationId: loanSimulationDataId, financingEntityId: req.params.rut });
    if (!auction) return errors.notFound(res);

    auction.checkListSent.checklistId = checklistId;

    for (const document of auction.checkListSent.checklistItems) {
      if (document.coreParamId === coreParamId) {
        document.uuids = uuids;
        document.status = status;
      }
    }

    auction.markModified('checkListSent');
    await auction.save();
    req.app.socketIo.emit(`RELOAD_EFICAR_AUCTION_${loanSimulationDataId}`);
  }
  res.status(200).end();
};

const documentStatusUpdate = async (req, res) => {
  // updates documents status after clicking approve/reject (or cancel) in eficar
  const { loanApplicationId, checklistItems, comment } = req.body;
  const auction = await Auction.findOne({ simulationId: loanApplicationId, financingEntityId: req.params.rut });
  if (!auction) return errors.notFound(res);

  auction.checkListSent = { ...auction.checkListSent, checklistItems: await getCompleteItems(checklistItems), comment };
  auction.markModified('checkListSent');
  await auction.save();
  req.app.socketIo.emit(`RELOAD_EFICAR_AUCTION_${loanApplicationId}`);
  res.status(200).end();
};

const documentStatusChange = async (req, res) => {
  const response = await HTTP.post(`${CORE_URL}${PATH_ENDPOINT_CORE_DOCUMENT_STATUS}`, {
    ...req.body,
    feIdentificationValue: req.user.companyIdentificationValue,
  });

  if (response.status !== 200) return errors.badRequest(res);

  res.json({
    ...response.data,
  });
};

const confirmation = async (req, res) => {
  // this function is called when the checklist is approved or rejected in eficar and its status changes to CHECKLIST_CONFIRMED or CHECKLIST_REJECTED
  const { loanApplicationId, status } = req.body;

  const auction = await Auction.findOne({ simulationId: loanApplicationId, financingEntityId: req.params.rut });
  if (!auction) return errors.notFound(res);

  auction.finalLoanStatus = await findLoanStatus(status);
  await auction.save();
  req.app.socketIo.emit(`RELOAD_EFICAR_AUCTION_${loanApplicationId}`);
  res.status(200).end();
};

const downloadDocument = async (req, res) => {
  const { loanSimulationDataId, checklistId, uuid } = req.body;
  const response = await HTTP.post(`${CORE_URL}${PATH_ENDPOINT_CORE_DOWNLOAD_DOCUMENT}`, {
    loanSimulationDataId,
    checklistId,
    uuid,
  });

  if (response.status !== 200) return errors.badRequest(res);

  res.json({
    ...response.data,
  });
};

module.exports = {
  downloadDocument,
  checklist,
  documentStatusChange,
  reception,
  documentStatusUpdate,
  confirmation,
};
