const AuctionParticipants = require('amices/models/auctionParticipants.model');
const Assistances = require('amices/models/assistances.model');
const Params = require('amices/controllers/params.controller');
const errors = require('amices/errors');
const HTTP = require('requests');
const { PATH_ENDPOINT_CORE_GET_ASSISTANCES_FOR_LOAN } = require('amices/core.services');
const { generateTireProtection, generateMinorReparations } = require('amices/templates/assistances');

const { CORE_URL } = process.env;

const generateAssistanceDocuments = async ({ loanApplicationId }) => {
  try {
    const response = await HTTP.get(`${CORE_URL}${PATH_ENDPOINT_CORE_GET_ASSISTANCES_FOR_LOAN}/${loanApplicationId}`);
    const { amicarAssistance } = response.data;
    const amicesAssistances = await Assistances.find({});

    const assistancesToGenerate = amicesAssistances.filter((assistance) =>
      amicarAssistance.some((coreAssistance) => coreAssistance.id === assistance.id /*& loanAssistance.selected*/),
    );
    /*
    - generar los  pdfs y enviarlos al core también de la misma forma en que me hubieran subido documentos desde amices
    - Debido a que los subiré al core, tengo que encontrar la forma de identificar estos documentos en eficar para
      no mostrarlos o solo no permitir eliminarlos
    */

    const tireProtection = generateTireProtection();
    const minorReparations = generateMinorReparations();
    return minorReparations;
  } catch (err) {
    console.log(err.message);
  }
};

const assistances = async (req, res) => {
  const document = await generateAssistanceDocuments({ loanApplicationId: req.body.loanApplicationId });
  res.set('Content-Type', 'application/pdf;');
  res.set('Content-Disposition', 'attachment; filename="filename222.pdf"');
  res.set('Cache-control', 'no-store, no-cache, max-age=0');
  res.end(document, 'binary');
};

const update = async (req, res) => {
  // This function is called when a checklist item changes its status by being approved, rejected or downloaded.
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
  if (status) auction.status = status;
  if (status === 'CHECKLIST_CONFIRMED') generateAssistanceDocuments({ loanApplicationId });

  auction.markModified('auctionParticipants');
  await auction.save();
  req.app.socketIo.emit(`RELOAD_AUCTION_${loanApplicationId}`);
  req.app.socketIo.emit(`RELOAD_EFICAR_AUCTION_${loanApplicationId}`);
  return res.status(200).json();
};

module.exports = { update, assistances };
